import "./DiningTabs.css";

function DiningTabs({
    dining,
    activeDining,
    setActiveDining
}) {

    return (

        <div className="dining-tabs">

            {dining.map((item) => (

                <button
                    key={item.id}
                    className={
                        activeDining.id === item.id
                            ? "dining-tab active"
                            : "dining-tab"
                    }
                    onClick={() => setActiveDining(item)}
                >
                    {item.name}
                </button>

            ))}

        </div>

    );

}

export default DiningTabs;