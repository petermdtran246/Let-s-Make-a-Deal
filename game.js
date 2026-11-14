$(document).ready(function() {

    // list of college & lifestyle prizes with dollar values and emojis
    const campusRewards = [
        { title: "Full Semester Tuition Grant", value: 8500, emoji: "🎓" },
        { title: "High-End Creator Laptop", value: 2400, emoji: "💻" },
        { title: "Electric Commuter Bike", value: 1200, emoji: "🚲" },
        { title: "Studio Noise-Canceling Headphones", value: 350, emoji: "🎧" },
        { title: "Campus Bookstore Gift Card", value: 150, emoji: "📚" },
        { title: "Free Coffee Pass for a Month", value: 75, emoji: "☕" },
        { title: "Large Pepperoni Pizza", value: 20, emoji: "🍕" },
        { title: "Single Mismatched Sock", value: 2, emoji: "🧦" },
        { title: "A Raw Baking Potato (Zonk!)", value: 1, emoji: "🥔" }
    ];

    // assignedPrizes stores the 3 active prizes, roundFinished prevents extra inputs
    let assignedPrizes = [];
    let roundFinished = false;

    // randomly pick 3 unique rewards from the array when the page loads
    function initRound() {
        let poolCopy = [...campusRewards];

        for (let i = 0; i < 3; i++) {
            let pickIndex = Math.floor(Math.random() * poolCopy.length);
            assignedPrizes.push(poolCopy[pickIndex]);
            // remove selected prize so all three curtains hide different items
            poolCopy.splice(pickIndex, 1);
        }
    }

    initRound();

    // chapter 9 events: handle both mouse clicks and keyboard keys (1, 2, 3)
    $(".stage-door").click(function() {
        if (roundFinished) return;
        let slotIndex = parseInt($(this).data("slot"), 10);
        processDoorChoice(slotIndex);
    });

    $(document).keydown(function(event) {
        if (roundFinished) return;

        if (event.key === "1") {
            processDoorChoice(0);
        } else if (event.key === "2") {
            processDoorChoice(1);
        } else if (event.key === "3") {
            processDoorChoice(2);
        }
    });

    // calculate the host's buyout offer and trigger the confirm() dialog
    function processDoorChoice(chosenSlot) {
        roundFinished = true;

        let curtainNumber = chosenSlot + 1;
        let hiddenReward = assignedPrizes[chosenSlot];

        // highlight the chosen curtain on screen
        $(`#curtain-${chosenSlot}`).addClass("is-picked");
        $("#game-prompt").text(`Curtain #${curtainNumber} is locked in! Let's see what the host offers...`);

        // host strategy: 70% of the time offer less than the prize value to protect the budget,
        // 30% of the time offer more so players can't easily predict the host's hand
        let cashOffer = 0;
        let odds = Math.random();

        if (odds < 0.70) {
            // lowball offer: 40% to 80% of the actual item's value
            let cutRate = 0.40 + (Math.random() * 0.40);
            cashOffer = Math.max(1, Math.round(hiddenReward.value * cutRate));
        } else {
            // generous/bluff offer: 115% to 155% of the value plus $15
            let boostRate = 1.15 + (Math.random() * 0.40);
            cashOffer = Math.round(hiddenReward.value * boostRate) + 15;
        }

        // slight pause so the highlight renders before confirm() pops up
        setTimeout(function() {
            let dialogText =
                `You locked in Curtain #${curtainNumber}!\n\n` +
                `Hold on—before we pull back the curtain, I'm willing to hand you $${cashOffer.toLocaleString()} in cash right now to walk away from Curtain #${curtainNumber}.\n\n` +
                `Press OK to TAKE the $${cashOffer.toLocaleString()} cash, or Cancel to KEEP Curtain #${curtainNumber}.`;

            let tookCash = confirm(dialogText);

            showAllPrizes(chosenSlot, tookCash, cashOffer);
        }, 150);
    }

    // open every curtain and display how the player's decision turned out
    function showAllPrizes(chosenSlot, tookCash, cashOffer) {
        let curtainNumber = chosenSlot + 1;
        let hiddenReward = assignedPrizes[chosenSlot];

        for (let i = 0; i < 3; i++) {
            let item = assignedPrizes[i];
            let card = $(`#curtain-${i}`);

            let tagHTML = (i === chosenSlot) ? `<span class="choice-tag">Your Choice</span>` : "";

            let revealHTML = `
                ${tagHTML}
                <div class="reward-emoji">${item.emoji}</div>
                <div class="reward-title">${item.title}</div>
                <div class="reward-cash">$${item.value.toLocaleString()}</div>
            `;

            card.addClass("is-open");
            card.find(".curtain-front").hide();
            card.find(".prize-reveal").html(revealHTML).fadeIn("fast");
        }

        // build the final result message
        let summaryHTML = "";
        if (tookCash) {
            let netGain = cashOffer - hiddenReward.value;
            let reaction = netGain >= 0
                ? `Great deal! You walked away with $${netGain.toLocaleString()} MORE than Curtain #${curtainNumber} was worth!`
                : `Tough luck! You left $${Math.abs(netGain).toLocaleString()} on the table!`;

            summaryHTML = `You took the host's buyout of <strong>$${cashOffer.toLocaleString()}</strong>! ` +
                          `Behind Curtain #${curtainNumber} was <strong>${hiddenReward.title} ($${hiddenReward.value.toLocaleString()})</strong>. ${reaction}`;
        } else {
            let netGain = hiddenReward.value - cashOffer;
            let reaction = netGain >= 0
                ? `Bold move! Your prize beat the host's $${cashOffer.toLocaleString()} cash offer by $${netGain.toLocaleString()}!`
                : `Ouch! You passed up $${cashOffer.toLocaleString()} in guaranteed cash for a smaller prize.`;

            summaryHTML = `You said no to the cash and kept <strong>Curtain #${curtainNumber}</strong>, winning <strong>${hiddenReward.title} ($${hiddenReward.value.toLocaleString()})</strong>! ${reaction}`;
        }

        $("#game-prompt").text("Round Complete! Check out what was hiding behind all three curtains.");
        $("#outcome-details").html(summaryHTML);
        $("#outcome-box").fadeIn("fast");
    }

    // refresh the page to start a fresh round
    $("#restart-btn").click(function() {
        location.reload();
    });

});