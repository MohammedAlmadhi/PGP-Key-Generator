document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('editKeyForm');
    const updateButton = document.getElementById('updateKeyBtn');
  
    updateButton.addEventListener('click', async () => {
      const formData = {
        id: document.getElementById('keyId').value,
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
  
        formData.publicKey = publicKeyArmored;
        formData.privateKey = privateKeyArmored;
  
        await updateKey(formData);
      } catch (error) {
        console.error('Error generating PGP keys:', error);
      }
    });
  
    async function updateKey(formData) {
      try {
        const response = await fetch(`/edit/${formData.id}`, {
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
          console.error('Failed to update keys:', result.message);
        }
      } catch (error) {
        console.error('Error updating keys on server:', error);
      }
    }
  });
  