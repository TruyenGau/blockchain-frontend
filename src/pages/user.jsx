import { notification, Table } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { fetchUserApi } from "../util/api";

const UserPage = () => {
    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetchUserApi();
            if (!res?.message) {
                setDataSource(res);
            } else {
                notification.error({
                    message: "Unauthorized",
                    description: res.message
                })
            }
        }
        fetchUser();
    }, [])

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Role',
            dataIndex: 'role',
        },
    ];

    return (
        <>
            <div style={{ padding: 30 }}>
                <Table dataSource={dataSource} columns={columns} bordered rowKey={"_id"} />;
            </div>
        </>
    )
}

export default UserPage