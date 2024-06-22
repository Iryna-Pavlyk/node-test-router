import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.name,
      data: err,
    });
    return;
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    error: err.message,
  });
};

//  if (error instanceof HttpError) {
//    const { status, message } = error;
//    res.status(status).json({
//      status,
//      message,
//      data: error,
//    });
//    return;
//  }
