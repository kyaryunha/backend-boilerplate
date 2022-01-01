const express = require('express');
const { appRoute, authRoute, userRoute, docsRoute } = require('../../modules/routes');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/',
        route: appRoute,
    },
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/users',
        route: userRoute,
    },
];

const devRoutes = [
    {
        path: '/docs',
        route: docsRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

if (config.env === 'development') {
    devRoutes.forEach((route) => {
        router.use(route.path, route.route);
    });
}

module.exports = router;
