import constructGetUrl from '../utils/constructGetUrl'

const host = process.env.FAUCET_URL ? process.env.FAUCET_URL : "https://faucet-center.artela.network"
// const host = "https://campaign.artela.network"

const getTaskListByAccount = async (account: string, id?: number) => {
    const response = await fetch(constructGetUrl(`${host}/api/goplus/tasks`, {accountAddress: account, id}), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await response.json();
    return data;
}

const initTaskListByAccount = async (account: string, taskId: string, token: string, secret: string) => {
    const response = await fetch(`${host}/api/goplus/new-task`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            accountAddress: account,
            taskId,
            captchaToken: token,
            secret
        })
    })
    const data = await response.json();
    return data;
}
const syncTask = async (account: string, taskId: string) => {
    const response = await fetch(`${host}/api/goplus/sync`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            accountAddress: account,
            taskId
        })
    })
    const data = await response.json();
    return data;
}

const updateTask = async (account: string, id: number, taskStatus: string, txs?: string, memo?: string) => {
    const response = await fetch(`${host}/api/goplus/update-task`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            accountAddress: account,
            id,
            taskStatus,
            txs,
            memo
        })
    })
    const data = await response.json();
    console.log(data)
    return data;
}
export {getTaskListByAccount, initTaskListByAccount, updateTask, syncTask};
