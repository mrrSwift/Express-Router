import * as express from 'express';

declare function autoFetch(
    express: typeof import('express'),
    cAddress?: string,
    mAddress?: string
): express.Router;

export = autoFetch;