import { ChalkInstance } from 'chalk';

export interface MessageData {
    messageType: string;
    body: string;
    senderName: string;
    senderNumber: string;
    chatType: 'group' | 'private';
    groupName?: string;
    groupSize?: number;
    isOwner: boolean;
    isAdmin: boolean;
    isCommand: boolean;
    hasMedia: boolean;
    isQuoted: boolean;
    executionTime?: number;
}

export interface BotInfo {
    name?: string;
    version?: string;
    commandCount?: number;
    [key: string]: any;
}

export interface PerformanceStats {
    uptime?: number;
    commandsExecuted?: number;
    averageResponseTime?: number;
    commandsPerMinute?: number;
    errors?: number;
    [key: string]: any;
}

export interface ConnectionDetails {
    [key: string]: any;
}

export interface SecurityDetails {
    [key: string]: any;
}

export interface LogContext {
    command?: string;
    user?: string;
    stack?: string;
    [key: string]: any;
}

export type LogLevel = 'info' | 'success' | 'error' | 'warning' | 'debug' | 'security' | 'performance';
export type CommandStatus = 'executing' | 'success' | 'error' | 'cooldown' | 'permission';
export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'reconnecting';
export type SecuritySeverity = 'low' | 'medium' | 'high' | 'critical';
export type LoadingType = 'dots' | 'spin' | 'bounce' | 'pulse' | 'wave';
export type BoxStyle = 'rounded' | 'square' | 'double';

export interface Colors {
    primary: ChalkInstance;
    secondary: ChalkInstance;
    success: ChalkInstance;
    warning: ChalkInstance;
    error: ChalkInstance;
    info: ChalkInstance;
    owner: ChalkInstance;
    admin: ChalkInstance;
    group: ChalkInstance;
    private: ChalkInstance;
    command: ChalkInstance;
    media: ChalkInstance;
    quoted: ChalkInstance;
    time: ChalkInstance;
    user: ChalkInstance;
    message: ChalkInstance;
    system: ChalkInstance;
    debug: ChalkInstance;
    performance: ChalkInstance;
    security: ChalkInstance;
    bot: ChalkInstance;
    gradient1: ChalkInstance;
    gradient2: ChalkInstance;
    neon: ChalkInstance;
    gold: ChalkInstance;
    [key: string]: ChalkInstance;
}

export interface Icons {
    command: string;
    message: string;
    media: string;
    reaction: string;
    success: string;
    error: string;
    warning: string;
    info: string;
    owner: string;
    admin: string;
    user: string;
    bot: string;
    group: string;
    private: string;
    online: string;
    offline: string;
    loading: string;
    processing: string;
    rocket: string;
    star: string;
    fire: string;
    lightning: string;
    timer: string;
    chart: string;
    time: string;
    shield: string;
    key: string;
    lock: string;
    unlock: string;
    gear: string;
    cpu: string;
    memory: string;
    database: string;
    sparkles: string;
    diamond: string;
    crown: string;
    magic: string;
    crystal: string;
    [key: string]: string;
}

export interface LoadingFrames {
    dots: string[];
    spin: string[];
    bounce: string[];
    pulse: string[];
    wave: string[];
    [key: string]: string[];
}

export interface Utils {
    createSeparator(char?: string, length?: number, color?: ChalkInstance): string;
    createBox(content: string, title?: string, color?: ChalkInstance, style?: BoxStyle): string;
    createGradientText(text: string, startColor?: ChalkInstance, endColor?: ChalkInstance): string;
    getTimeStamp(includeDate?: boolean): string;
    formatBytes(bytes: number, decimals?: number): string;
    formatDuration(ms: number): string;
}

export interface Logger {
    /**
     * Log bot startup information with a beautiful banner
     */
    logStartup(botInfo: BotInfo): void;

    /**
     * Log incoming messages with detailed formatting
     */
    logMessage(messageData: MessageData): void;

    /**
     * Log command execution status
     */
    logCommand(
        commandName: string,
        status?: CommandStatus,
        executionTime?: number | null,
        context?: LogContext
    ): void;

    /**
     * Log system messages with categories
     */
    logSystem(message: string, type?: LogLevel, category?: string): void;

    /**
     * Log errors with stack traces and context
     */
    logError(error: Error, context?: LogContext): void;

    /**
     * Log performance statistics
     */
    logPerformance(stats: PerformanceStats): void;

    /**
     * Log connection status changes
     */
    logConnection(status: ConnectionStatus, details?: ConnectionDetails): void;

    /**
     * Create animated loading indicator
     * @returns Timer ID that can be used with clearInterval
     */
    loading(message: string, type?: LoadingType): NodeJS.Timeout;

    /**
     * Clear the current loading animation
     */
    clearLoading(): void;

    /**
     * Log security alerts with severity levels
     */
    logSecurity(event: string, severity?: SecuritySeverity, details?: SecurityDetails): void;

    /**
     * Color palette for styling
     */
    colors: Colors;

    /**
     * Icon collection for visual elements
     */
    icons: Icons;

    /**
     * Utility functions for formatting and logging
     */
    utils: Utils;
}

/**
 * Main logger instance
 */
export declare const logger: Logger;

/**
 * Create a new logger instance
 */
export declare function createLogger(): Logger;

/**
 * Default export - logger instance
 */
declare const _default: Logger;
export default _default;