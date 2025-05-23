import express from 'express';
import { config } from 'dotenv';
import router from './routes/api';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import httpLoggerService from './src/services/logger/httpLoggerService';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import fileUpload from 'express-fileupload';

const application = express();

config();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Documentation',
    version: '1.0.0',
  },
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
application.use(express.urlencoded({ extended: false }));
application.use(express.json());
application.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
application.use(logger('dev'));
application.use(express.static('public'));
application.use(httpLoggerService);
application.use(cookieParser());
application.use(cors());
application.use('/api/v1', router);
application.use(fileUpload());

export default application;
