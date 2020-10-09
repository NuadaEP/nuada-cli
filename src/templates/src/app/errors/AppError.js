class AppError {
  error;

  statusCode;

  constructor(error, statusCode = 400) {
    this.error = error;
    this.statusCode = statusCode;
  }
}

<% if (props.sucrase) { -%>
export default new AppError();
<% } else { -%>
module.exports = new AppError();
<% } -%>
