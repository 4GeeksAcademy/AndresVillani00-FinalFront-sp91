import React from "react";
import "../../styles/index.css"; // Adjust the path to your CSS file
import { useContext } from "react";
import { Context } from "../store/appContext";

export const TradeModal = (coin) => {
    // if (!isOpen) return null; // Render nothing if `isOpen` is false
    const { store, actions } = useContext(Context);

    const handleTrade = () => {
        const tradeType = document.getElementById("tradeType").value;
        const quantity = parseFloat(document.getElementById("quantity").value);

        if (tradeType && quantity > 0) {
            console.log(`Executing trade: ${tradeType} ${quantity} of ${coinName}`);
            onTrade(tradeType, quantity);
        } else {
            alert("Please select a trade type and enter a valid quantity.");
        }
    };

    return (
        store.showTradeModal ? 
            <div className="modal-overlay">
                <div className="modal-content">
                    <button className="close-button" onClick={() => actions.setShowTradeModal()}>×</button>
                    <h2>Trade {store.tradeCoin.name}</h2>
                    <div>
                        <label>
                            Trade Options:
                            <select id="tradeType">
                                <option value="buy">Buy</option>
                                <option value="sell">Sell</option>
                            </select>
                        </label>
                        <label>
                            Quantity:
                            <input type="number" min="1" id="quantity" placeholder="Enter quantity" />
                        </label>
                    </div>
                    <button className="btn btn-success" onClick={handleTrade}>Confirm Trade</button>
                </div>
            </div>
        :
        null
    );
};
