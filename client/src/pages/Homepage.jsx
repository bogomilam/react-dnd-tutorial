import React, { useState } from "react";
import Item from "../components/Item";
import DropWrapper from "../components/DropWrapper";
import Col from "../components/Col";
import { data, statuses } from "../data/numbClasses";
import PoolWrapper from "../components/PoolWrapper";


const Homepage = () => {
    const [items, setItems] = useState(data);

    const onDrop = (item, monitor, status) => {
        const mapping = statuses.find(i => i.status === status);

        setItems(prevState => {
            const newItems = prevState
                .filter(i => i.id !== item.id)
                .concat({ ...item, status, icon: mapping.icon });
            return [ ...newItems ];
        });
    };

    const moveItem = (dragIndex, hoverIndex) => {
        const item = items[dragIndex];

        setItems(prevState => {
            const newItems = prevState.filter((i, idx) => idx !== dragIndex);
            newItems.splice(hoverIndex, 0, item);
            return  [ ...newItems ];
        
        });
    };

    return (
        <div className={"row"}>
            {statuses.filter(s => s.status !== "pool")
            .map(s => {
                return (
                    <div key={status} className={"col-wrapper"}>
                        <h2 className={"col-header"}>{s.status.toUpperCase()}
                        <div className={"color-bar2"} style={{ backgroundColor: s.color }}></div> 
                        </h2>
                        
                        <DropWrapper onDrop={onDrop} status={s.status}>
                            <Col>
                                {items
                                    .filter(i => i.status === s.status)
                                    .map((i, idx) => <Item className={""} key={i.id} item={i} index={idx} moveItem={moveItem} status={s} />)
                                }
                            </Col>
                        </DropWrapper>
                    </div>
                );
            })
            }
        {statuses.filter(s => s.status === "pool")
        .map(s => {
            return (
            <div key={status} className={"pool-wrapper-div"}>
                <h2 className={"col-header"}>{s.status.toUpperCase()}
                <div className={"color-bar2"} style={{ backgroundColor: s.color }} ></div> 
                </h2>
                    <PoolWrapper onDrop={onDrop} status={s.status}>
                        <Col>
                        {items.filter(i => i.status === s.status)
                        .map((i, idx) => <Item className={""} key={i.id} item={i} index={idx} moveItem={moveItem} status={s} />)
                        }
                        </Col>
                                </PoolWrapper>
                                </div>
            )
        })}
        </div>
    );
};

export default Homepage;