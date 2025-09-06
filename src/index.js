import chalk from 'chalk';

const createLogger = () => {
    // Expanded color palette with gradients
    const colors = {
        primary: chalk.hex('#00D9FF'),      // Cyan blue
        secondary: chalk.hex('#667EEA'),    // Blue violet
        success: chalk.hex('#00FF88'),      // Bright green
        warning: chalk.hex('#FFB800'),      // Orange
        error: chalk.hex('#FF4757'),        // Red
        info: chalk.hex('#A55EEA'),         // Purple
        owner: chalk.hex('#FF6B35'),        // Orange red
        admin: chalk.hex('#FFA726'),        // Amber
        group: chalk.hex('#26C6DA'),        // Cyan
        private: chalk.hex('#AB47BC'),      // Purple
        command: chalk.hex('#42A5F5'),      // Blue
        media: chalk.hex('#FF7043'),        // Deep orange
        quoted: chalk.hex('#EC407A'),       // Pink
        time: chalk.hex('#66BB6A'),         // Light green
        user: chalk.hex('#5C6BC0'),         // Indigo
        message: chalk.hex('#FFF176'),      // Light yellow
        system: chalk.hex('#78909C'),       // Blue grey
        debug: chalk.hex('#9E9E9E'),        // Grey
        performance: chalk.hex('#4CAF50'),  // Green
        security: chalk.hex('#F44336'),     // Red
        bot: chalk.hex('#2196F3'),          // Blue
        gradient1: chalk.hex('#667EEA'),    // Gradient start
        gradient2: chalk.hex('#764BA2'),    // Gradient end
        neon: chalk.hex('#39FF14'),         // Neon green
        gold: chalk.hex('#FFD700')          // Gold
    };

    const icons = {
        command: '⚡',
        message: '💬',
        media: '📎',
        reaction: '🎭',
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️',

        // User types
        owner: '👑',
        admin: '🛡️',
        user: '👤',
        bot: '🤖',

        // Chat types
        group: '👥',
        private: '🔒',

        // Status indicators
        online: '🟢',
        offline: '🔴',
        loading: '⏳',
        processing: '⚙️',

        // Performance
        rocket: '🚀',
        star: '⭐',
        fire: '🔥',
        lightning: '⚡',
        timer: '⏱️',
        chart: '📊',

        // System
        time: '⏰',
        shield: '🛡️',
        key: '🔑',
        lock: '🔒',
        unlock: '🔓',
        gear: '⚙️',
        cpu: '💻',
        memory: '🧠',
        database: '🗄️',

        // Special effects
        sparkles: '✨',
        diamond: '💎',
        crown: '👑',
        magic: '🪄',
        crystal: '🔮'
    };

    // Animation frames for loading
    const loadingFrames = {
        dots: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
        spin: ['|', '/', '-', '\\'],
        bounce: ['⠁', '⠂', '⠄', '⡀', '⢀', '⠠', '⠐', '⠈'],
        pulse: ['●', '◐', '◑', '◒', '◓', '○'],
        wave: ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█', '▇', '▆', '▅', '▄', '▃', '▁']
    };

    // Utility functions
    const createSeparator = (char = '─', length = 80, color = colors.primary) => {
        return color(char.repeat(length));
    };

    const createGradientText = (text, startColor = colors.gradient1, endColor = colors.gradient2) => {
        const chars = text.split('');
        const totalChars = chars.length;

        return chars.map((char, index) => {
            const ratio = index / (totalChars - 1);
            // Simple gradient simulation by alternating colors
            return ratio < 0.5 ? startColor(char) : endColor(char);
        }).join('');
    };

    const createBox = (content, title = '', color = colors.primary, style = 'rounded') => {
        const lines = content.split('\n');
        const maxLength = Math.max(...lines.map(line => line.replace(/\x1b\[[0-9;]*m/g, '').length), title.length);
        const width = Math.min(maxLength + 4, 100);

        const styles = {
            rounded: {
                topLeft: '╭', topRight: '╮', bottomLeft: '╰', bottomRight: '╯',
                horizontal: '─', vertical: '│', cross: '┼'
            },
            square: {
                topLeft: '┌', topRight: '┐', bottomLeft: '└', bottomRight: '┘',
                horizontal: '─', vertical: '│', cross: '┼'
            },
            double: {
                topLeft: '╔', topRight: '╗', bottomLeft: '╚', bottomRight: '╝',
                horizontal: '═', vertical: '║', cross: '╬'
            }
        };

        const s = styles[style] || styles.rounded;

        const topLine = `${s.topLeft}${s.horizontal.repeat(width - 2)}${s.topRight}`;
        const bottomLine = `${s.bottomLeft}${s.horizontal.repeat(width - 2)}${s.bottomRight}`;
        const titleLine = title ? `${s.vertical} ${color.bold(title.padEnd(width - 4))} ${s.vertical}` : '';
        const separatorLine = title ? `├${s.horizontal.repeat(width - 2)}┤` : '';

        const contentLines = lines.map(line => {
            const cleanLine = line.replace(/\x1b\[[0-9;]*m/g, '');
            const padding = width - 4 - cleanLine.length;
            return `${s.vertical} ${line}${' '.repeat(Math.max(0, padding))} ${s.vertical}`;
        });

        return color([
            topLine,
            titleLine,
            separatorLine,
            ...contentLines,
            bottomLine
        ].filter(Boolean).join('\n'));
    };

    const getTimeStamp = (includeDate = false) => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        if (includeDate) {
            const dateStr = now.toLocaleDateString('en-US');
            return `${dateStr} ${timeStr}`;
        }
        return timeStr;
    };

    const formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

    const formatDuration = (ms) => {
        if (ms < 1000) return `${ms}ms`;
        if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
        if (ms < 3600000) return `${Math.floor(ms / 60000)}m ${Math.floor((ms % 60000) / 1000)}s`;
        return `${Math.floor(ms / 3600000)}h ${Math.floor((ms % 3600000) / 60000)}m`;
    };



    return {

        logStartup: (botInfo) => {
            console.clear();

            const maxWidth = 80;
            const termWidth = Math.min(process.stdout.columns || 80, maxWidth);

            const stripAnsi = (str) =>
                str.replace(/\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])/g, '');

            const centerLabelValue = (label, value) => {
                const combined = `${label} ${value}`;
                const cleanLength = stripAnsi(combined).length;

                const leftPadding = Math.max(0, Math.floor((termWidth - cleanLength) / 2));
                const rightPadding = Math.max(0, termWidth - cleanLength - leftPadding);

                return ' '.repeat(leftPadding) + combined + ' '.repeat(rightPadding);
            };

            const separator = '-'.repeat(termWidth);

            const version = botInfo.version || '1.0.0';
            const commandCount = botInfo.commandCount || 0;
            const startedAt = getTimeStamp(true);
            const botName = botInfo.name || '🤖 APPLICATION LOGGER 🤖';

            const banner = [
                separator,
                centerLabelValue(
                    createGradientText(botName, colors.neon, colors.gold),
                    ''
                ),
                separator,
                centerLabelValue(
                    colors.success(`${icons.success} Status:`),
                    colors.success.bold('ONLINE & OPERATIONAL')
                ),
                centerLabelValue(
                    colors.info(`${icons.rocket} Version:`),
                    colors.info.bold(`v${version}`)
                ),
                centerLabelValue(
                    colors.primary(`${icons.bot} WhatsApp:`),
                    colors.primary.bold('Connected & Ready')
                ),
                centerLabelValue(
                    colors.time(`${icons.time} Started:`),
                    colors.time.bold(startedAt)
                ),
                centerLabelValue(
                    colors.performance(`${icons.cpu} System:`),
                    colors.performance.bold(`Node.js ${process.version}`)
                ),
                centerLabelValue(
                    colors.security(`${icons.shield} Security:`),
                    colors.security.bold('All systems secured')
                ),
                separator,
                centerLabelValue(colors.neon('✨ Bot is ready to handle messages! ✨'), ''),
                separator,
            ].join('\n');

            console.log(banner);
        },

        logMessage: (messageData) => {
            const {
                messageType,
                body,
                senderName,
                senderNumber,
                chatType,
                groupName,
                groupSize,
                isOwner,
                isAdmin,
                isCommand,
                hasMedia,
                isQuoted,
                executionTime
            } = messageData;

            // Status badges with beautiful styling
            const badges = [];
            if (isOwner) badges.push(colors.owner(`${icons.crown} OWNER`));
            if (isAdmin) badges.push(colors.admin(`${icons.shield} ADMIN`));
            if (isQuoted) badges.push(colors.quoted(`${icons.quoted} REPLY`));
            if (hasMedia) badges.push(colors.media(`${icons.media} MEDIA`));

            // Message type styling
            const typeIcon = isCommand ? icons.lightning : hasMedia ? icons.media : icons.message;
            const typeColor = isCommand ? colors.command : hasMedia ? colors.media : colors.info;
            const typeText = messageType.toUpperCase();

            // Chat info with enhanced styling
            const chatIcon = chatType === 'group' ? icons.group : icons.private;
            const chatColor = chatType === 'group' ? colors.group : colors.private;
            const chatInfo = chatType === 'group'
                ? `${chatIcon} ${chatColor.bold(groupName || 'Unknown Group')} ${colors.system(`(${groupSize} members)`)}`
                : `${chatIcon} ${chatColor.bold('Private Chat')}`;

            // Performance indicator
            const perfIndicator = executionTime
                ? executionTime > 1000
                    ? colors.warning(`${icons.timer} ${executionTime}ms`)
                    : colors.success(`${icons.timer} ${executionTime}ms`)
                : '';

            const displayMessage = body.length > 50 ? body.substring(0, 47) + '...' : body;

            console.log(`
${createSeparator('═', 80, typeColor)}
${typeColor.bold(`${typeIcon} [${typeText}]`)} ${colors.time(`${icons.time} ${getTimeStamp()}`)} ${perfIndicator}
${colors.message(`${icons.message} Message:`)} ${colors.message.bold(displayMessage || `[${messageType}]`)}
${colors.user(`${icons.user} From:`)} ${colors.user.bold(senderName)} ${colors.system(`(+${senderNumber})`)}
${colors.info(`${icons.database}  Chat:`)} ${chatInfo}
${badges.length > 0 ? `${colors.info(`${icons.star} Tags:`)} ${badges.join(' ')}` : ''}
${createSeparator('─', 80, colors.system)}
`);
        },

        // command logging
        logCommand: (commandName, status = 'executing', executionTime = null, context = {}) => {
            const timestamp = colors.time(`[${getTimeStamp()}]`);

            switch (status) {
                case 'executing':
                    console.log(`${colors.command(`${icons.gear} ${timestamp}`)} ${colors.command.bold('EXECUTING')} ${colors.command(`command: ${commandName}`)}`);
                    break;

                case 'success':
                    const successColor = executionTime > 1000 ? colors.warning : colors.success;
                    console.log(`${successColor(`${icons.success} ${timestamp}`)} ${successColor.bold('SUCCESS')} ${successColor(`"${commandName}" completed in ${executionTime}ms`)}`);
                    break;

                case 'error':
                    console.log(`${colors.error(`${icons.error} ${timestamp}`)} ${colors.error.bold('FAILED')} ${colors.error(`"${commandName}" error after ${executionTime}ms`)}`);
                    break;

                case 'cooldown':
                    console.log(`${colors.warning(`${icons.timer} ${timestamp}`)} ${colors.warning.bold('COOLDOWN')} ${colors.warning(`"${commandName}" rate limited`)}`);
                    break;

                case 'permission':
                    console.log(`${colors.security(`${icons.lock} ${timestamp}`)} ${colors.security.bold('DENIED')} ${colors.security(`"${commandName}" insufficient permissions`)}`);
                    break;
            }
        },

        // System logging with categories
        logSystem: (message, type = 'info', category = 'SYSTEM') => {
            const colorMap = {
                success: colors.success,
                error: colors.error,
                warning: colors.warning,
                info: colors.info,
                debug: colors.debug,
                security: colors.security,
                performance: colors.performance
            };

            const iconMap = {
                success: icons.success,
                error: icons.error,
                warning: icons.warning,
                info: icons.info,
                debug: icons.gear,
                security: icons.shield,
                performance: icons.chart
            };

            const color = colorMap[type] || colors.info;
            const icon = iconMap[type] || icons.info;
            const timestamp = colors.time(`[${getTimeStamp()}]`);

            console.log(`${color(`${icon} ${timestamp}`)} ${color.bold(`[${category}]`)} ${color(message)}`);
        },

        // error logging with stack traces
        logError: (error, context = {}) => {
            const timestamp = getTimeStamp(true);
            const errorId = Math.random().toString(36).substring(2, 8).toUpperCase();

            const errorDetails = [
                `${colors.error.bold('Error ID:')} ${colors.error(errorId)}`,
                `${colors.error.bold('Message:')} ${error.message || 'Unknown error'}`,
                `${colors.info.bold('Command:')} ${context.command || 'N/A'}`,
                `${colors.info.bold('User:')} ${context.user || 'Unknown'}`,
                `${colors.info.bold('Time:')} ${timestamp}`,
                `${colors.info.bold('Process:')} PID ${process.pid}`
            ];

            if (context.stack) {
                const stackLines = context.stack.split('\n').slice(0, 3);
                errorDetails.push(`${colors.warning.bold('Stack:')} ${stackLines[0]}`);
                stackLines.slice(1).forEach(line => {
                    errorDetails.push(`         ${colors.debug(line.trim())}`);
                });
            }

            const errorBox = createBox(
                errorDetails.join('\n'),
                `${icons.error} CRITICAL ERROR - ID: ${errorId}`,
                colors.error,
                'double'
            );

            console.log('\n' + errorBox + '\n');
        },

        // Performance monitoring
        logPerformance: (stats) => {
            const uptime = formatDuration(stats.uptime || 0);
            const memUsage = process.memoryUsage();

            const perfData = [
                `${colors.success(`${icons.rocket} Commands Executed:`)} ${colors.success.bold(stats.commandsExecuted || 0)}`,
                `${colors.info(`${icons.timer} Average Response:`)} ${colors.info.bold((stats.averageResponseTime || 0).toFixed(2) + 'ms')}`,
                `${colors.warning(`${icons.chart} Commands/Min:`)} ${colors.warning.bold((stats.commandsPerMinute || 0).toFixed(1))}`,
                `${colors.error(`${icons.error} Total Errors:`)} ${colors.error.bold(stats.errors || 0)}`,
                `${colors.performance(`${icons.time} Uptime:`)} ${colors.performance.bold(uptime)}`,
                `${colors.system(`${icons.memory} Memory:`)} ${colors.system.bold(formatBytes(memUsage.heapUsed))}/${formatBytes(memUsage.heapTotal)}`,
                `${colors.primary(`${icons.cpu} CPU:`)} ${colors.primary.bold(process.cpuUsage().user / 1000000 + 'ms')}`
            ];

            const perfBox = createBox(
                perfData.join('\n'),
                `${icons.chart} PERFORMANCE DASHBOARD`,
                colors.performance,
                'rounded'
            );

            console.log('\n' + perfBox + '\n');
        },

        // Connection status logging
        logConnection: (status, details = {}) => {
            const statusColors = {
                connecting: colors.warning,
                connected: colors.success,
                disconnected: colors.error,
                reconnecting: colors.info
            };

            const statusIcons = {
                connecting: icons.loading,
                connected: icons.online,
                disconnected: icons.offline,
                reconnecting: icons.gear
            };

            const color = statusColors[status] || colors.info;
            const icon = statusIcons[status] || icons.info;

            console.log(`${color(`${icon} [${getTimeStamp()}] CONNECTION ${status.toUpperCase()}`)} ${color(JSON.stringify(details))}`);
        },

        // Loading animations
        loading: (message, type = 'dots') => {
            const frames = loadingFrames[type] || loadingFrames.dots;
            let i = 0;

            return setInterval(() => {
                process.stdout.write(`\r${colors.primary(frames[i])} ${colors.primary(message)}`);
                i = (i + 1) % frames.length;
            }, 100);
        },

        // Clear loading
        clearLoading: () => {
            process.stdout.write('\r\x1b[K');
        },

        // Security alerts
        logSecurity: (event, severity = 'medium', details = {}) => {
            const severityColors = {
                low: colors.info,
                medium: colors.warning,
                high: colors.error,
                critical: colors.security
            };

            const color = severityColors[severity] || colors.warning;
            const securityBox = createBox(
                `${colors.security.bold('Event:')} ${event}\n` +
                `${colors.info.bold('Severity:')} ${color.bold(severity.toUpperCase())}\n` +
                `${colors.info.bold('Time:')} ${getTimeStamp(true)}\n` +
                `${colors.info.bold('Details:')} ${JSON.stringify(details, null, 2)}`,
                `${icons.shield} SECURITY ALERT`,
                color,
                'double'
            );

            console.log('\n' + securityBox + '\n');
        },

        // Export utilities
        colors,
        icons,
        utils: {
            createSeparator,
            createBox,
            createGradientText,
            getTimeStamp,
            formatBytes,
            formatDuration
        }
    };
};

// Create and export the logger instance
export const logger = createLogger();

export default logger;