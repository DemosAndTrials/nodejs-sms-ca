import express from 'express';
import middlewaresConfig from './config/middleware';;
import ApiRoutes from './controllers';

const app = express();

/**
 * MIDDLEWARES
 */

middlewaresConfig(app);

/**
 * API ROUTES
 */
app.use('/api', ApiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if (err) {
        console.error(err);
    }
    else {
        console.log(`Server Running on port: ${PORT}`);
    }
});