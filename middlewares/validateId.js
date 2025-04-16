
export default function validateId(schema) {
  return (req, res, next) => {
    try {
      const { error, value } = schema.validate(req.params);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      req.params = value;
      next();
    } catch (error) {
      next(error);
    }
  };
}