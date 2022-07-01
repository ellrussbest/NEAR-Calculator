import "./Navbar.css";

export default function Navbar({ address, amount, symbol, destroy }) {
    if(address) {
        return(
            <div className="flex justify-end mt-5 mr-5">
                <button className="dropdown bg-slate-300 hover:bg-slate-400 text-black font-bold py-2 px-4 rounded-full">
                    <span>{amount} {symbol}</span>
                    <div className="dropdown-content">
                        <a href={`https://explorer.testnet.near.org/accounts/${address}`} target="_blank">{address}</a>
                        <button
                            onClick={() => {
                                destroy();
                              }}
                        >
                            Disconnect
                        </button>
                    </div>
                </button>
            </div>            
        );
    }
    return null;
}