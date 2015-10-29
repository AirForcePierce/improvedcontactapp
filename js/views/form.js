function formTemp() {
  return `
    <form>
      Name: <input type="text" name="FullName">
      <br>
      PhoneNum: <input type="text" name="PhoneNum">
      <br>
      Location: <input type="text" name="Location">
      <br>
      Email: <input type="text" name="Email">
      <br>
      <input id="btnCreateUser" type="button" value="Submit" />
    </form>
  `;
}

export default formTemp;
