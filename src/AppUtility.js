export function handelRightClick(event) {
  event.preventDefault();
}

export function decryptToken(token) {
  if (token !== null) {
    let position = 3;
    // let custrated =token.substr(0, position - 1) + token.substr(position, token.length);
    // let fin = custrated.substring(3);
    // // => console.log(fin);
    // return fin
     //return token.substring(3);

    
    const [f,s,...t] = token.split('.')
    let cF = f.substring(3);
    let cS = s.substr(0, position - 1) + s.substr(position, s.length);
   // let cT = t.substr(0,-1);
    //[cF,cS,...rest].join('.')
    let fin = [cF,cS,...t].join('.');
  
    // console.log(fin);
    return fin;
  }
  return;
}
