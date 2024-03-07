let slotsPerLevel = [4, 2];

let alterSlots = 5;

document.addEventListener('DOMContentLoaded', () => {
   
    slotsPerLevel = JSON.parse(localStorage.getItem('slotsPerLevel')) || [4, 2];
    alterSlots = parseInt(localStorage.getItem('alterSlots'), 10) || 5;

    displaySpellSlots(slotsPerLevel);
    displayAlterSlots();
    fetchSpells();

    const resetButton = document.getElementById('longRest');
    resetButton.addEventListener('click', resetSpellAndAlterSlots);

    document.querySelectorAll('.cast-spell').forEach(button => {
        button.addEventListener('click', function() {
            const spellLevel = parseInt(this.getAttribute('data-level'), 10);
            if (canCastSpell(spellLevel)) {
                useSpellSlot(spellLevel);
            } else {
                alert('No more slots available for this level.');
            }
        });
    });

    document.getElementById('submit-alteration').addEventListener('click', function() {
        useAlterSlot();

        
    });
});
