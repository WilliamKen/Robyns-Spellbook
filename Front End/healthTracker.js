document.addEventListener('DOMContentLoaded', () => {
    const applyDamageButton = document.getElementById('apply-damage');

    applyDamageButton.addEventListener('click', () => {
        const hpInput = document.getElementById('hp');
        const tempHpInput = document.getElementById('tempHp');
        const damageInput = document.getElementById('damage');

        let currentHp = parseInt(hpInput.value);
        let currentTempHp = parseInt(tempHpInput.value);
        const changeInHp = parseInt(damageInput.value);

        if (changeInHp < 0) {
            // Healing
            currentHp = Math.min(currentHp - changeInHp, 20); // Change max HP here upon leveling up
        } else {
            // Taking Damage
            currentTempHp -= changeInHp;

            // If Temp HP is completely depleted, subtract the remainder from regular HP
            if (currentTempHp < 0) {
                currentHp += currentTempHp; // currentTempHp is negative here
                currentTempHp = 0;
            }
        }

        // Update the HP and Temp HP values
        hpInput.value = currentHp > 0 ? currentHp : 0; // Prevent HP from going below 0
        tempHpInput.value = currentTempHp;

        // Clear the damage input field
        damageInput.value = '';
    });
});



