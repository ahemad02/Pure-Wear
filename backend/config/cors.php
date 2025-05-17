<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross‑Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross‑origin resource sharing
    | or “CORS”. This determines what cross‑origin operations may execute
    | in web browsers. Adjust these as needed.
    |
    */

    // Which paths to apply CORS to:
    'paths'                    => ['api/*', 'sanctum/csrf-cookie'],

    // HTTP methods to allow:
    'allowed_methods'          => ['*'],

    // Frontend origin you want to allow:
    'allowed_origins'          => ['http://localhost:5173'],

    // (leave empty unless you need regex origins)
    'allowed_origins_patterns' => [],

    // Which headers can be sent by the client:
    'allowed_headers'          => ['*'],

    // Which headers are exposed back to the client:
    'exposed_headers'          => [],

    // How long (in seconds) browsers can cache a preflight response:
    'max_age'                  => 0,

    // Whether to accept and send cookies/auth credentials:
    'supports_credentials'     => true,

];
