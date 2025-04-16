

export default function validateRequest(schema) {
  return (req, res, next) => {
    try {
      const { error, value } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        return res.status(400).json({ 
          message: "Error in request body",
          errors: error.details.map((err) => ({ ...err, message: err.message.replace("Validation error: ", "") }))
        });
      }
      req.body = value;
      next();
    } catch (error) {
      next(error);
    }
  };
}