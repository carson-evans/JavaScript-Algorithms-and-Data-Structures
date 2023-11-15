function rot13(str) {
    return str
      .split('')
      .map(char => {
        // Check if the character is alphabetic
        if (/[A-Z]/.test(char)) {
          // Apply ROT13 transformation to alphabetic characters
          const charCode = char.charCodeAt(0);
          const offset = charCode < 78 ? 13 : -13;
          return String.fromCharCode(charCode + offset);
        } else {
          // Non-alphabetic characters remain unchanged
          return char;
        }
      })
      .join('');
  }
  
  // Test cases
  console.log(rot13("SERR PBQR PNZC")); // "FREE CODE CAMP"
  console.log(rot13("SERR CVMMN!")); // "FREE PIZZA!"
  console.log(rot13("SERR YBIR?")); // "FREE LOVE?"
  console.log(rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.")); // "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG."  