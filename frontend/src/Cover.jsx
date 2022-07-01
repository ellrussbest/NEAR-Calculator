import "./App.css";

export default function Cover({name, login, coverImg}) {
    if ((name, login, coverImg)) {
        return (
            <div className="calculator-wrapper flex flex-col justify-center bg-black min-h-screen text-center object-center">
                <div className="mt-auto text-white mb-5">
                    <div
                        className="mb-2 flex justify-center max-w-full"
                    >
                        <img src={coverImg} alt="" className="object-contain h-96 w-96" />
                    </div>
                    <span className="text-5xl my-5">{name}</span>
                    <p className="my-5">Please connect your wallet to continue.</p>

                    <button
                        onClick={login}
                        className="rounded-full px-3 mt-3 outline outline-offset-2 outline-1"
                    >
                        Connect Wallet
                    </button>
                </div>
                <p className="mt-auto text-stone-600">Powered by NEAR</p>
            </div>
        );
    }
    return null;
}