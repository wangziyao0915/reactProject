import React, { useEffect, useMemo, useState } from 'react'
import { Layout, Collapse, Button, message, Icon, Popconfirm, Modal } from 'antd'
import { connect } from 'dva'
import Students from './students'
const { Header, Content } = Layout
const { Panel } = Collapse;

interface PropsData {
    fetchClassLists(): void,
    deleteClassItem(cid: string): void,
    classLists: any[]
    classStudents: any[]
}

const Class: React.FC<PropsData> = (props) => {
    let [remindVisible, setRemindVisible] = useState(false)
    let [deleteClass, setDeleteClass] = useState('')

    // 初始化触发action 请求班级列表数据
    useEffect(() => {
        let { fetchClassLists } = props;
        fetchClassLists()
    }, [])

    let { classLists, classStudents, deleteClassItem } = props;

    let remindOk = () => {
        if (!!deleteClass) {
            deleteClassItem(deleteClass)
        }
        setRemindVisible(false)
    }

    let remindCancel = () => {
        setDeleteClass('')
        setRemindVisible(false)
    }

    let Panels = useMemo(() => {
        return classLists.map((item: any) => {
            let header = `班级：${item.class_name}`;
            let deleteButton = <Icon theme="filled" type="delete" onClick={(event: React.MouseEvent) => { event.stopPropagation(); setDeleteClass(item.cid); setRemindVisible(true) }} />

            return (
                <Panel key={item.cid} header={header} extra={deleteButton}>
                    <Students lists={classStudents[item.cid]} classid={item.class_name} cid={item.cid}/>
                </Panel>
            )
        })
    }, [classLists, classStudents])

    return (
        <Layout>
            <Header>
                班级管理
            </Header>
            <Content>
                <Collapse accordion={true}>
                    {Panels}
                </Collapse>
                <Modal
                    title="提示"
                    visible={remindVisible}
                    onOk={remindOk}
                    onCancel={remindCancel}
                >
                    <p>你确定要删除此班级吗?</p>
                </Modal>
            </Content>
        </Layout>
    )
}

interface ClassState {
    classEdit: {
        classLists: any[],
        classStudents: any[]
    }
}

export default connect((state: ClassState) => {
    return {
        classLists: state.classEdit.classLists,
        classStudents: state.classEdit.classStudents
    }
}, (dispatch) => {
    return {
        fetchClassLists() {
            dispatch({
                type: "classEdit/fetchClassAction"
            })
        },
        deleteClassItem(cid: string) {
            dispatch({
                type: "classEdit/deleteClassAction",
                payload: cid
            })
        }
    }
})(Class)
