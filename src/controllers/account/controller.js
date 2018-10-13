
const createAccount = async (req, res) => {

    const { name } = req.body;
    console.log(name);
    if (!name) {
        return res.status(500).json({ success: false, message: 'missing account name' });
    }

    return res.status(200).json({ success: true, account: "account" });
}

const getAccounts = async (req, res) => {

    return res.status(200).json({ success: true, accounts: "accounts" });
}

export {
    createAccount,
    getAccounts
}