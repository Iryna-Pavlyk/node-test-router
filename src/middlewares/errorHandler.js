// import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
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

//  res.status(500).json({
//    status: 500,
//    message: 'Something went wrong',
//    data: error.message,
//  });
