class PGPGenerator {
  constructor() {
    this.form = document.getElementById('pgpForm');
    this.publicKeyArea = document.getElementById('publicKey');
    this.privateKeyArea = document.getElementById('privateKey');
    this.generateButton = document.getElementById('generateKeyBtn');
    this.downloadPubKeyButton = document.getElementById('downloadPubKey');
    this.downloadPrivKeyButton = document.getElementById('downloadPrivKey');

    console.log('PGP Generator Initialized');

    if (this.generateButton) {
      this.generateButton.addEventListener('click', () => this.validateForm());
      console.log('Event listener attached');
    } else {
      console.log('Generate button not found');
    }

    if (this.downloadPubKeyButton) {
      this.downloadPubKeyButton.addEventListener('click', () => this.downloadKey(this.publicKeyArea.value, 'public'));
    }
    if (this.downloadPrivKeyButton) {
      this.downloadPrivKeyButton.addEventListener('click', () => this.downloadKey(this.privateKeyArea.value, 'private'));
    }
  }

  validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const algorithm = document.getElementById('algorithm').value;
    const keySize = document.getElementById('keySize').value;
    const expires = document.getElementById('expires').value;
    const passphrase = document.getElementById('passphrase').value;

    if (!name || !email || !algorithm || !keySize || !expires || !passphrase) {
      this.showFlashMessage('Missing Information', 'danger');
    } else {
      this.checkAuthentication();
    }
  }

  showFlashMessage(message, type) {
    const flashMessageContainer = document.createElement('div');
    flashMessageContainer.className = `alert alert-${type}`;
    flashMessageContainer.textContent = message;

    const container = document.getElementById('generate-cont');
    container.insertBefore(flashMessageContainer, container.firstChild);

    setTimeout(() => {
      flashMessageContainer.remove();
    }, 3000);
  }

  checkAuthentication() {
    fetch('/user/check-authentication')
      .then(response => response.json())
      .then(data => {
        if (data.authenticated) {
          this.generateKey();
        } else {
          window.location.href = '/user/login';
        }
      })
      .catch(error => {
        console.error('Error checking authentication:', error);
        window.location.href = '/user/login';
      });
  }

  async generateKey() {
    console.log('Generate key function called');
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      algorithm: document.getElementById('algorithm').value,
      keySize: parseInt(document.getElementById('keySize').value, 10),
      expires: parseInt(document.getElementById('expires').value, 10),
      passphrase: document.getElementById('passphrase').value,
    };

    try {
      const { privateKeyArmored, publicKeyArmored } = await openpgp.generateKey({
        userIds: [{ name: formData.name, email: formData.email }],
        curve: formData.algorithm === 'rsa' ? undefined : 'curve25519',
        rsaBits: formData.algorithm === 'rsa' ? formData.keySize : undefined,
        passphrase: formData.passphrase,
        format: 'armored'
      });

      this.publicKeyArea.value = publicKeyArmored;
      this.privateKeyArea.value = privateKeyArmored;

      // Send the keys to the server
      await this.sendKeysToServer({ ...formData, publicKey: publicKeyArmored, privateKey: privateKeyArmored });

      // Show success flash message
      this.showFlashMessage('Key pair have been generated', 'success');
    } catch (error) {
      console.error('Error generating PGP keys:', error);
    }
  }

  async sendKeysToServer(formData) {
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (result.success) {
        window.location.href = '/user/profile';
      } else {
        console.error('Failed to store keys:', result.message);
      }
    } catch (error) {
      console.error('Error sending keys to server:', error);
    }
  }

  downloadKey(key, type) {
    const blob = new Blob([key], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pgp-${type}-key.asc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

// Initialize the PGPGenerator once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => new PGPGenerator());
