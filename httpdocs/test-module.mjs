console.log("Module loaded.");

class Test {
  #priv = "abc";

  constructor(inp) {
    this.#priv = inp;
  }
  get prop1() {
    return this.#priv;
  }
}

export function addTwo(num) {
  return num + 2;
}

export function greet(name) {
  const x = new Test(name);
  return `Hello ${x.prop1}!`;
}

export function intlTest(inp) {
  // const outp = new Intl.NumberFormat().format(inp);
  // https://unicode.org/reports/tr35/tr35-general.html#Unit_Elements
  return new Intl.NumberFormat("de-AT", { style: "unit", unit: "kilometer-per-hour" }).format(50);
}

// Server only function:
export async function serverReadFile(fname) {
  if (typeof fname !== "string") return;
  let fs;
  try {
    fs = await import("fs");
  } catch (error) {
    console.log("Error when loading FileSystem! => Probably on a Client.");
    return;
  }
  const contents = fs.readFileSync(fname);
  const data = contents;
  return data.toString();
}
