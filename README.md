# Enkripsi dan Dekripsi AES pada React

Proyek ini adalah aplikasi web React yang mendemonstrasikan enkripsi dan dekripsi pesan menggunakan algoritma AES.

## Tujuan

Tujuan utama proyek ini adalah untuk menunjukkan bagaimana Anda dapat mengenkripsi dan mendekripsi pesan menggunakan AES dalam aplikasi web React.

## Cara Penggunaan

1. Buka proyek di editor Anda.
2. Jalankan `npm install` atau `yarn install` di terminal untuk menginstal dependensi yang diperlukan.
3. Jalankan `npm start` atau `yarn start` di terminal untuk menjalankan aplikasi dalam mode pengembangan.
4. Buka [http://localhost:3000](http://localhost:3000) di browser Anda.
5. Masukkan pesan yang ingin Anda enkripsi atau dekripsi.
6. Masukkan kunci yang Anda ingin gunakan.
7. Klik tombol "Process" untuk melakukan proses.
8. Anda dapat mengklik tombol "Copy" untuk menyalin pesan yang diproses ke clipboard.

## Fitur

- Enkripsi AES menggunakan CryptoJS.
- Dekripsi AES menggunakan CryptoJS.
- Validasi input pesan dan kunci.
- Tombol "Copy" yang tersembunyi hingga pesan diproses.

##

Dalam proyek ini, algoritma AES digunakan untuk enkripsi dan dekripsi pesan. Berikut adalah cara kerja algoritma AES dalam aplikasi web React yang tertera dalam proyek ini:

1. Import `useState` dan `CryptoJS` dari pustaka yang diperlukan.

```javascriptreact
import { useState } from "react";
import CryptoJS from "crypto-js";
```

2. Buat state untuk menyimpan pesan, kunci, pesan yang diproses, mode (enkripsi atau dekripsi), dan status salin.

```javascriptreact
const [message, setMessage] = useState("");
const [key, setKey] = useState("");
const [processedMessage, setProcessedMessage] = useState();
const [mode, setMode] = useState("Encrypt");
const [copyMessage, setCopyMessage] = useState(false);
```

3. Buat fungsi enkripsi yang menggunakan `CryptoJS.AES.encrypt()` untuk mengenkripsi pesan.

```javascriptreact
const encrypt = () => {
  const encrypted = CryptoJS.AES.encrypt(message, key);
  setProcessedMessage(encrypted);
};
```

4. Buat fungsi dekripsi yang menggunakan `CryptoJS.AES.decrypt()` untuk mendekripsi pesan.

```javascriptreact
const decrypt = () => {
  const decrypted = CryptoJS.AES.decrypt(message, key);

  if (decrypted.sigBytes < 1) {
    alert("Invalid Key!");
    return;
  }

  setProcessedMessage(decrypted.toString(CryptoJS.enc.Utf8));
};
```

5. Buat fungsi proses yang akan dipanggil ketika tombol "Process" ditekan.

```javascriptreact
const process = () => {
  if (message === "") {
    alert("Please enter a message.");
    document.getElementById("message").focus();
    return;
  }

  if (key === "") {
    alert("Please enter a key.");
    document.getElementById("key").focus();
    return;
  }

  if (mode === "Encrypt") {
    encrypt();
    setCopyMessage(true);
    return;
  }

  if (mode === "Decrypt") {
    decrypt();
    return;
  }
};
```

6. Buat fungsi salin yang akan dipanggil ketika tombol "Copy" ditekan.

```javascriptreact
const copy = () => {
  try {
    if (processedMessage) {
      navigator.clipboard.writeText(processedMessage);
      alert("Text copied to clipboard!");
    }
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};
```

Dengan menggunakan algoritma AES dalam aplikasi web React seperti yang ditunjukkan dalam proyek ini, Anda dapat melakukan enkripsi dan dekripsi pesan dengan aman.
