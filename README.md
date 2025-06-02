# 🎨 Logyo

> A beautiful, feature-rich terminal logger with animations, gradients, and comprehensive logging capabilities

[![npm version](https://badge.fury.io/js/logyo.svg)](https://badge.fury.io/js/logyo)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎨 **Rich Visual Design** - Gradient colors, Unicode icons, and beautiful formatting
- 📊 **Performance Monitoring** - Built-in metrics tracking and system monitoring
- 🔒 **Security Logging** - Dedicated security event tracking with severity levels
- 📁 **File Persistence** - Automatic JSON file logging with structured data
- 🎭 **Animations** - Loading spinners and dynamic visual effects
- 🎯 **Multiple Log Types** - Messages, commands, system events, errors, and more
- 🛡️ **Error Handling** - Comprehensive error logging with stack traces
- ⚡ **High Performance** - Optimized for minimal overhead

## 🚀 Installation

```bash
npm install logyo
```

# 📖 Quick Start

## ES6 Modules (Modern Node.js)

```javascript
import { logger } from 'logyo';

// Initialize with bot information
logger.logStartup({
  version: '1.0.0',
  commandCount: 25
});

// Log messages
logger.logMessage({
  messageType: 'text',
  body: 'Hello World!',
  senderName: 'Aeon San',
  senderNumber: '',
  chatType: 'private',
  isCommand: false,
  executionTime: 150
});

```

## CommonJS (Traditional Node.js)

```javascript
const { logger } = require('logyo');

// Same usage as above
logger.logStartup({
  version: '1.0.0',
  commandCount: 25
});
```

## Browser (ES5 Compatible)
```javascript
// If using in browser with bundler
import { logger } from 'logyo';

// Or with script tag (after building)
const { logger } = window.Logyo;
```


# Logyo API Reference

## Core Methods

### `logger.logStartup(botInfo)`
Display a beautiful startup banner with system information.

#### Parameters:
- **botInfo** (Object)
  - **version** (string) - Bot version
  - **commandCount** (number) - Number of available commands

---

### `logger.logMessage(messageData)`
Log incoming messages with rich formatting.

#### Parameters:
- **messageData** (Object)
  - **messageType** (string) - Type of message
  - **body** (string) - Message content
  - **senderName** (string) - Sender's name
  - **senderNumber** (string) - Sender's number
  - **chatType** ('group' | 'private') - Chat type
  - **groupName** (string, optional) - Group name if applicable
  - **groupSize** (number, optional) - Group member count
  - **isOwner** (boolean) - Is sender the owner
  - **isAdmin** (boolean) - Is sender an admin
  - **isCommand** (boolean) - Is this a command
  - **hasMedia** (boolean) - Contains media
  - **isQuoted** (boolean) - Is a quoted message
  - **executionTime** (number, optional) - Processing time in ms

---

### `logger.logCommand(commandName, status, executionTime, context)`
Log command execution with status tracking.

#### Parameters:
- **commandName** (string) - Name of the command
- **status** ('executing' | 'success' | 'error' | 'cooldown' | 'permission') - Command status
- **executionTime** (number, optional) - Execution time in milliseconds
- **context** (Object, optional) - Additional context data

---

### `logger.logSystem(message, type, category)`
Log system events with categorization.

#### Parameters:
- **message** (string) - Log message
- **type** ('success' | 'error' | 'warning' | 'info' | 'debug' | 'security' | 'performance') - Log type
- **category** (string) - Event category (default: 'SYSTEM')

---

### `logger.logError(error, context)`
Log errors with stack traces and context.

#### Parameters:
- **error** (Error) - Error object
- **context** (Object, optional) - Additional context
  - **command** (string) - Command that caused the error
  - **user** (string) - User identifier
  - **stack** (string) - Custom stack trace

---

### `logger.logPerformance(stats)`
Display performance dashboard with system metrics.

#### Parameters:
- **stats** (Object)
  - **commandsExecuted** (number) - Total commands executed
  - **averageResponseTime** (number) - Average response time in ms
  - **commandsPerMinute** (number) - Commands per minute rate
  - **errors** (number) - Total error count
  - **uptime** (number) - Uptime in milliseconds

---

### `logger.logConnection(status, details)`
Log connection status changes.

#### Parameters:
- **status** ('connecting' | 'connected' | 'disconnected' | 'reconnecting') - Connection status
- **details** (Object, optional) - Additional connection details

---

### `logger.logSecurity(event, severity, details)`
Log security events with severity levels.

#### Parameters:
- **event** (string) - Security event description
- **severity** ('low' | 'medium' | 'high' | 'critical') - Event severity
- **details** (Object, optional) - Event details

---

## Animation Methods

### `logger.loading(message, type)`
Start a loading animation.

#### Parameters:
- **message** (string) - Loading message
- **type** ('dots' | 'spin' | 'bounce' | 'pulse' | 'wave') - Animation type

#### Returns:
- **Interval ID** for clearing the animation

---

### `logger.clearLoading()`
Clear the current loading animation.

---

## Utility Access

Access colors, icons, and utility functions.

```javascript
// Access colors, icons, and utility functions
const { colors, icons, utils } = logger;

// Create custom separators
console.log(utils.createSeparator('=', 50, colors.primary));

// Create custom boxes
console.log(utils.createBox('Custom content', 'Title', colors.success));

// Format utilities
console.log(utils.formatBytes(1024000)); // "1000 KB"
console.log(utils.formatDuration(65000)); // "1m 5s"
```

# 🎨 Customization

## Colors
The logger includes an extensive color palette:

- `primary`, `secondary`, `success`, `warning`, `error`
- `info`, `owner`, `admin`, `group`, `private`
- `command`, `media`, `quoted`, `time`, `user`
- `message`, `system`, `debug`, `performance`
- `security`, `bot`, `neon`, `gold`

## Icons
Unicode icons for various elements:

- **Status**: `success`, `error`, `warning`, `info`
- **Users**: `owner`, `admin`, `user`, `bot`
- **System**: `time`, `shield`, `key`, `lock`, `gear`
- **Special**: `sparkles`, `diamond`, `crown`, `magic`

---

# 📁 File Logging
Logyo automatically saves logs to JSON files in the `logs/` directory:

- **Daily log files**: `bot-YYYY-MM-DD.json`
- Structured JSON format with timestamps
- Process ID tracking
- Automatic directory creation

---

# 🔧 Configuration
Currently, Logyo uses sensible defaults. Future versions will include:

- Custom color schemes
- Configurable file paths
- Log level filtering
- Custom formatters

---

---

# 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
