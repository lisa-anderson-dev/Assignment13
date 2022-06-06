const $ = id => document.getElementById(id);

const bankAccount = ownerName => {
    let balance = 0;
    let owner = ownerName;
    let status = '';
    return ({
        withdrawal: function(withdrawalAmount) {
            if (withdrawalAmount === null) {
                status = '';
            } else {
                withdrawalAmount = parseFloat(withdrawalAmount);
                if (isNaN(withdrawalAmount) || withdrawalAmount > balance) {
                    status = 'Cannot process transaction.  Withdrawal amount must be a number and cannot exceed balance.';
                } else {
                    balance -= withdrawalAmount;
                    status = `A withdrawal of $${withdrawalAmount.toFixed(2)} has been processed.`;
                }
            }
        },
        deposit: function(depositAmount) {
            if (depositAmount === null) {
                status = '';
            } else {
                depositAmount = parseFloat(depositAmount);
                if (isNaN(depositAmount)) {
                    status = 'Cannot process transaction.  Deposit amount must be a number.';
                } else {
                    balance += depositAmount;
                    status = `A deposit of $${depositAmount.toFixed(2)} has been processed.`;
                }
            }          
        },
        getBalance: function() {
            return balance.toFixed(2);
        },
        getOwnerName: function() {
            return owner;
        },
        getStatus: function() {
            return status;
        }
    });
}

let account;

window.addEventListener('load', () => {
    let nameBtn = $('nameBtn');
    let depositBtn = $('depositBtn');
    let withdrawalBtn = $('withdrawalBtn');

    nameBtn.addEventListener('click', () => {
        const owner = prompt('Enter the account name');
        if (owner) {
            account = bankAccount(owner);
            $('accountInfo').innerHTML = `${account.getOwnerName()}'s Balance - $${account.getBalance()}`;
        }   
    });
    
    depositBtn.addEventListener('click', () => {
        if (account) {
            let depositAmount = prompt('Enter an amount to deposit');
            account.deposit(depositAmount);
            $('accountInfo').innerHTML = `${account.getOwnerName()}'s Balance - $${account.getBalance()}<br>${account.getStatus()}`;
        } else {
            alert('You must select an account before making a deposit');
        }  
    });
    
    withdrawalBtn.addEventListener('click', () => {
        if (account) {
            let withdrawalAmount = prompt('Enter an amount to withdraw');
            account.withdrawal(withdrawalAmount);
            $('accountInfo').innerHTML = `${account.getOwnerName()}'s Balance - $${account.getBalance()}<br>${account.getStatus()}`;
        } else {
            alert('You must select an account before making a withdrawal');
        }
    });
});
