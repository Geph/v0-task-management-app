# MySQL Database Setup

This document covers the MySQL database configuration required for long-term analytics storage. The app sends analytics events to a lightweight PHP endpoint hosted on the same cPanel server, which then writes rows to the MySQL database.

---

## Connection Details

| Setting       | Value                          |
|---------------|--------------------------------|
| Database Name | `yourusername_taskapp`         |
| User          | `yourusername_taskapp`         |
| Password      | *(set in cPanel → MySQL Databases)* |
| Host          | `localhost`                    |
| Port          | `3306`                         |
| Charset       | `utf8mb4`                      |

> **Note:** On Dreamhost shared hosting, cPanel prefixes both the database name and the MySQL username with your hosting account username (e.g. `jsmith_taskapp`). Replace `yourusername` with your actual Dreamhost username throughout.

---

## Schema

Run the following SQL once inside **phpMyAdmin** (or via SSH with `mysql -u yourusername_taskapp -p yourusername_taskapp < schema.sql`) to create all required tables.

### Table: `analytics_events`

The single catch-all table for every event type. Each row stores one event with its JSON properties blob for flexibility.

```sql
CREATE TABLE IF NOT EXISTS `analytics_events` (
  `id`             BIGINT UNSIGNED  NOT NULL AUTO_INCREMENT,
  `event_name`     VARCHAR(64)      NOT NULL COMMENT 'e.g. session_start, task_added',
  `anonymous_id`   VARCHAR(64)      NOT NULL COMMENT 'UUID stored in cookie; links sessions to a user',
  `properties`     JSON             NOT NULL COMMENT 'Event-specific key/value pairs (see below)',
  `created_at`     DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_event_name`   (`event_name`),
  INDEX `idx_anonymous_id` (`anonymous_id`),
  INDEX `idx_created_at`   (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

## Event Reference

Each event maps to a row in `analytics_events`. The `properties` JSON column holds the fields listed below.

### `session_start`
**Metric informed:** Unique User Count

| Property       | Type   | Description                                              |
|----------------|--------|----------------------------------------------------------|
| `anonymous_id` | string | UUID generated on first visit and persisted in a cookie  |
| `user_agent`   | string | Raw browser User-Agent string                            |
| `screen_res`   | string | Screen resolution, e.g. `"1920x1080"`                   |

---

### `task_added`
**Metric informed:** Feature Affinity

| Property        | Type    | Description                                              |
|-----------------|---------|----------------------------------------------------------|
| `priority_emoji`| string  | Emoji character used as the task priority                |
| `text_length`   | integer | Character count of the task name at creation             |
| `task_id`       | string  | UUID of the newly created task                           |

---

### `status_toggled`
**Metric informed:** Task Completion Rate

| Property     | Type    | Description                                              |
|--------------|---------|----------------------------------------------------------|
| `new_status` | string  | `"Done"` or `"Todo"`                                     |
| `latency_ms` | integer | Milliseconds between click and UI state update           |

---

### `priority_updated`
**Metric informed:** Organizational Fluidity

| Property    | Type   | Description                     |
|-------------|--------|---------------------------------|
| `old_emoji` | string | Priority emoji before the change |
| `new_emoji` | string | Priority emoji after the change  |

---

### `task_deleted`
**Metric informed:** Cleanup Behavior

| Property            | Type    | Description                                              |
|---------------------|---------|----------------------------------------------------------|
| `time_since_created`| integer | Seconds between task creation and deletion               |
| `is_completed`      | boolean | Whether the task was marked complete before deletion     |

---

### `filter_sort_applied`
**Metric informed:** Cognitive Load

| Property    | Type   | Description                                          |
|-------------|--------|------------------------------------------------------|
| `sort_type` | string | `"Emoji"`, `"Date"`, or `"Alpha"`                    |

---

### `database_sync`
**Metric informed:** System Reliability

| Property       | Type    | Description                                              |
|----------------|---------|----------------------------------------------------------|
| `sync_result`  | string  | `"Success"` or `"Fail"`                                  |
| `payload_size` | integer | Byte size of the JSON payload sent to the PHP endpoint   |

---

### `inactivity_heartbeat`
**Metric informed:** Engagement Quality

| Property           | Type    | Description                                              |
|--------------------|---------|----------------------------------------------------------|
| `idle_time_seconds`| integer | Seconds since the last detected user interaction         |

---

## PHP Endpoint (`api/track.php`)

Place this file inside your public web root (e.g. `public_html/task/api/track.php`). The Next.js front end posts events to this endpoint.

```php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || empty($input['event_name']) || empty($input['anonymous_id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields: event_name, anonymous_id']);
    exit;
}

// --- Database credentials ---
define('DB_HOST', 'localhost');
define('DB_NAME', 'yourusername_taskapp');   // <-- update
define('DB_USER', 'yourusername_taskapp');   // <-- update
define('DB_PASS', 'your_password_here');     // <-- update

try {
    $pdo = new PDO(
        'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
        DB_USER,
        DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    $stmt = $pdo->prepare(
        'INSERT INTO analytics_events (event_name, anonymous_id, properties)
         VALUES (:event_name, :anonymous_id, :properties)'
    );
    $stmt->execute([
        ':event_name'   => substr($input['event_name'],   0, 64),
        ':anonymous_id' => substr($input['anonymous_id'], 0, 64),
        ':properties'   => json_encode($input['properties'] ?? new stdClass()),
    ]);

    echo json_encode(['ok' => true, 'id' => $pdo->lastInsertId()]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error', 'detail' => $e->getMessage()]);
}
```

---

## Environment Variable (`NEXT_PUBLIC_ANALYTICS_ENDPOINT`)

The front end reads the endpoint URL from an environment variable so you do not hard-code a URL.

Add the following to your `.env.local` (development) and to your Vercel project environment variables (production):

```
NEXT_PUBLIC_ANALYTICS_ENDPOINT=https://yourdomain.com/task/api/track.php
```

---

## Useful phpMyAdmin Queries

**Count unique users in the last 30 days:**
```sql
SELECT COUNT(DISTINCT anonymous_id) AS unique_users
FROM analytics_events
WHERE event_name = 'session_start'
  AND created_at >= NOW() - INTERVAL 30 DAY;
```

**Most popular priority emojis:**
```sql
SELECT
  JSON_UNQUOTE(JSON_EXTRACT(properties, '$.priority_emoji')) AS emoji,
  COUNT(*) AS count
FROM analytics_events
WHERE event_name = 'task_added'
GROUP BY emoji
ORDER BY count DESC;
```

**Task completion rate (Done vs. Todo toggles):**
```sql
SELECT
  JSON_UNQUOTE(JSON_EXTRACT(properties, '$.new_status')) AS status,
  COUNT(*) AS count
FROM analytics_events
WHERE event_name = 'status_toggled'
GROUP BY status;
```

**Database sync failure rate:**
```sql
SELECT
  JSON_UNQUOTE(JSON_EXTRACT(properties, '$.sync_result')) AS result,
  COUNT(*) AS count
FROM analytics_events
WHERE event_name = 'database_sync'
GROUP BY result;
```

**Average idle time from heartbeats:**
```sql
SELECT AVG(JSON_EXTRACT(properties, '$.idle_time_seconds')) AS avg_idle_seconds
FROM analytics_events
WHERE event_name = 'inactivity_heartbeat';
```

---

## Setup Checklist

- [ ] Create the MySQL database and user in cPanel → MySQL Databases
- [ ] Grant the user ALL PRIVILEGES on the database
- [ ] Run the `CREATE TABLE` SQL above in phpMyAdmin
- [ ] Upload `api/track.php` to your server with the correct credentials filled in
- [ ] Set `NEXT_PUBLIC_ANALYTICS_ENDPOINT` in `.env.local` and in your Vercel project
- [ ] Verify connectivity by sending a test POST request to the endpoint
