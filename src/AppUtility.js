export function handelRightClick(event) {
  event.preventDefault();
}

export function decryptToken(token) {
  if (token !== null) {
    // let position = 52;
    // let custrated =token.substr(0, position - 1) + token.substr(position, token.length);
    // let fin = custrated.substring(3);
    // console.log(fin);
    // return fin
    return token.substring(3);
  }
  return;
}
