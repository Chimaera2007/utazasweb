const esemeny = [];
const kepForrasok = [
  "01.jpeg",
  "02.jpeg",
  "03.jpeg",
  "04.jpeg",
  "05.jpeg",
  "06.jpeg",
  "07.jpeg",
  "08.jpeg",
  "09.jpeg",
  "10.jpeg",
  "11.jpeg",
  "12.jpeg",
  "13.jpeg",
  "14.jpeg",
  "15.jpeg",
  "16.jpeg",
  "17.jpeg",
  "18.jpeg",
  "19.jpeg",
  "20.jpeg",
  "21.jpeg",
  "22.jpeg",
  "23.jpeg",
  "24.jpeg",
  "25.jpeg",
  "26.jpeg",
];

function createData() {
  fetch("usaszoveg.txt")
    .then((res) => res.text())
    .then((data) => {
      const sorok = data.split("\n");
      let aktCim = "";
      let aktSzoveg = "";
      for (let i = 0; i < sorok.length; i++) {
        const sor = sorok[i].trim();
        // Ha cím (pl. "12. nap")
        if (/^\d+\. nap/.test(sor)) {
          // Ha van már előző cím és szöveg, mentsük el
          if (aktCim && aktSzoveg) {
            esemeny.push({ cim: aktCim, szoveg: aktSzoveg.trim() });
          }
          aktCim = sor;
          aktSzoveg = "";
        } else {
          aktSzoveg += sor + "\n";
        }
      }
      // Utolsó cím-szöveg páros mentése
      if (aktCim && aktSzoveg) {
        esemeny.push({ cim: aktCim, szoveg: aktSzoveg.trim() });
      }
      esemenykiir();
    });
}

function esemenykiir() {
  const content = document.getElementById("content");

  // Modal létrehozása, ha még nincs
  let modal = document.getElementById("image-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "image-modal";
    modal.style.display = "none";
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100vw";
    modal.style.height = "100vh";
    modal.style.background = "rgba(0,0,0,0.8)";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.zIndex = "9999";
    modal.style.flexDirection = "column";
    modal.innerHTML = `
      <span id="close-modal" style="position:absolute;top:30px;right:40px;font-size:3rem;color:white;cursor:pointer;z-index:10001">&times;</span>
      <img id="modal-img" src="" style="max-width:90vw;max-height:80vh;border-radius:10px;box-shadow:0 0 30px #000;" />
    `;
    document.body.appendChild(modal);
    document.getElementById("close-modal").onclick = function () {
      modal.style.display = "none";
    };
  }

  esemeny.forEach((element, index) => {
    const entryDiv = document.createElement("div");
    entryDiv.classList.add("entry");

    const textDiv = document.createElement("div");
    textDiv.classList.add("entry-text");

    const cim = document.createElement("h2");
    cim.classList.add("cim");
    cim.innerHTML = element.cim;

    const szoveg = document.createElement("p");
    szoveg.classList.add("szoveg");
    szoveg.innerHTML = element.szoveg;

    textDiv.appendChild(cim);
    textDiv.appendChild(szoveg);

    const imageDiv = document.createElement("div");
    imageDiv.classList.add("entry-image");
    const imgSrc = `usakiskepek/${kepForrasok[index % kepForrasok.length]}`;
    imageDiv.style.backgroundImage = `url(${imgSrc})`;
    imageDiv.style.cursor = "pointer";
    imageDiv.onclick = function () {
      document.getElementById("modal-img").src = imgSrc;
      modal.style.display = "flex";
    };

    entryDiv.appendChild(textDiv);
    entryDiv.appendChild(imageDiv);

    content.appendChild(entryDiv);
  });
}

createData();
