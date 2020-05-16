import React, { useEffect, useState, useRef, useMemo } from 'react'
import { Layout, Row, Col, Switch, Button, Modal, Input, message, Icon, DatePicker, Radio } from 'antd'
import Charts from '../../components/charts'
import styles from './index.css'
import moment from 'moment'
import { addStudent, addRecord, getStudentList, getClassList, createClass, logout } from './services'
import router from 'umi/router'
import Cookie from 'js-cookie'
let { Header, Content } = Layout
let { TextArea } = Input
const Home = () => {

    let [confirmLoading, setConfirmLoading] = useState(false)
    let [classVisible, setClassVisible] = useState(false)
    let [recordVisible, setRecordVisible] = useState(false)
    let [classname, setClassname] = useState('')
    let [classroom, setClassroom] = useState('')
    let [assistant, setAssistant] = useState('')
    let [classlists, setClassLists] = useState([])
    let [selected, setSelected] = useState(-1)
    let [selectedCid, setSelectedCid] = useState('')
    let [studentlists, setStudentLists] = useState([])
    let [examType, setExamType] = useState(0)
    let [addDate, setAddDate] = useState(moment(new Date(), 'YYYY-MM-DD'))
    let [theoryScore, setTheoryScore] = useState('')
    let [skillScore, setSkillScore] = useState('')
    let [analysis, setAnalysis] = useState('')
    let [studentName, setStudentName] = useState('')
    let [repetitions, setRepetitions] = useState('')
    let [studentId, setStudentId] = useState()
    let chartBox = useRef()

    //  mounted 生命周期
    useEffect(() => {
        fetch('/api/emstu/class/lists').then(res => res.json()).then(res => {
            if (res.code === 1) {
                setClassLists(res.lists)
            } else {
                message.error(res.msg)
            }
        })
        return () => {
            // cleanup
        };
    }, [])

    // 添加班级
    let handleAddClassOk = () => {
        if (classname && classroom && assistant) {
            setConfirmLoading(true)
            createClass({
                classname,
                classroom,
                assistant
            }).then(res => res.json()).then(res => {
                setConfirmLoading(false)
                if (res.code === 1) {
                    message.success(res.msg);

                    getClassList().then(res => {

                        if (res.code === 1) {
                            setClassLists(res.lists)
                        } else {
                            message.error(res.msg)
                        }
                    })
                }else{
                    message.error(res.msg)
                }
                setClassVisible(false)
            })
        }
    }
    let handleAddClassCancel = () => {
        setClassVisible(false)
    }
    // 添加成绩和日分析
    let handleRecordOk = () => {
        let recordDate = addDate.format('YYYY-MM-DD');
        if (theoryScore && addDate.format('YYYY-MM-DD') && skillScore && examType!==undefined) {
            if (theoryScore * 1 < 85 || skillScore * 1 < 85) {
                if (analysis !== "" && analysis.length > 5) {
                    //请求接口
                    addRecord({
                        record_date: recordDate,
                        stuid: studentId,
                        skill_score: skillScore,
                        theory_score: theoryScore,
                        analysis,
                        week_record: examType
                    }).then(res => {
                        if (res.code === 1) {
                            message.success(res.msg);
                            setRecordVisible(false)
                            // 重制modal内容
                            setSkillScore('')
                            setTheoryScore('')
                            setAnalysis('')
                            setExamType(0)
                            setAddDate(moment(new Date(), 'YYYY-MM-DD'))
                        } else {
                            message.error(res.msg || res.message)
                        }
                    })
                    
                } else {
                    message.warn('有成绩分数低于85，分析数据不可少，且长度不少于五个字')
                }
            } else {
                //请求接口
                addRecord({
                    record_date: recordDate,
                    stuid: studentId,
                    skill_score: skillScore,
                    theory_score: theoryScore,
                    analysis,
                    week_record: examType
                }).then(res => {
                    if (res.code === 1) {
                        message.success(res.msg)
                        setRecordVisible(false);
                        // 重制modal内容
                        setSkillScore('')
                        setTheoryScore('')
                        setAnalysis('')
                        setExamType(0)
                        setAddDate(moment(new Date(), 'YYYY-MM-DD'))
                    } else {
                        message.error(res.msg || res.message)
                    }
                })
                
            }
            
        }else{
            message.error('信息不全')
            
        }
    }
    let handleRecordCancel = () => {
        setRecordVisible(false)
    }

    // 获取班级学生列表
    useEffect(()=>{
        if(!selectedCid) return
        getStudentList(selectedCid).then(res => {
            if (res.code === 1) {
                setStudentLists(res.lists)
            } else {
                message.error(res.msg)
            }
        })
    },[selectedCid])

    // 添加学生
    let addNewStudent = () => {
        if(!classlists[selected]){
            message.info('请先选择班级！')
            return
        }
        if(!studentName || !repetitions){
            message.error('请填写学生信息')
            return 
        }
        addStudent({ stu_name: studentName, repetitions, cid: selectedCid })
            .then(
                res => {
                    if (res.code === 1) {
                        message.success(res.msg)
                        // 重新请求班级学生列表
                        getStudentList(selectedCid).then(res => {

                            if (res.code === 1) {
                                // console.log(res.lists)
                                setStudentLists(res.lists)
                            } else {
                                message.error(res.msg)
                            }
                
                        })
                    } else {
                        message.error(res.msg || res.message)
                    }
                }
            )
    }

    let logoutAction = () => {
        logout().then(async (res)=>{
            if(res.code===1){
                await message.success(res.msg)
                await Cookie.remove('loginId')
                router.push('/login')
            }else{
                message.error('error'+res.msg)
            }
        })
    }

    let disabledDate = (current) => {
        return (current && current > moment().endOf('day')) || (current && current < moment().subtract(21, 'days'));
    }

    // 使用useMemo函数进行优化
    let cachedClassLists = useMemo(()=>{
        return (
            classlists.map((item, index) => {
                return <Button type={selected === index ? 'primary' : 'dashed'} onClick={() => { setSelected(index); setSelectedCid(classlists[index].cid) }} key={item.cid}>{item.class_name}</Button>
            })
        )
    }, [classlists, selected])

    let cachedStudentLists = useMemo(()=>{
        
        return studentlists.length ? studentlists.map(
            (item) => {
                return (
                    <Row key={item.stuid} type="flex" align="middle" justify="space-around" gutter={[0,30]} style={{ background: '#fff' }}>
                        <Col span={20}>
                            <div className={styles["chart-box"]} ref={chartBox}>
                                <Charts stuid={item.stuid} stuName={item.stu_name} cid={selectedCid}/>
                            </div>
                            <div className="student-detail" style={{ background: '#f0f2f5', padding: '10px' }}>
                                <Button onClick={() => { setRecordVisible(true); setStudentId(item.stuid) }}>添加成绩<Icon type="plus-circle" /></Button>
                                <Button style={{ float: 'right' }} onClick={()=>{ router.push(`/record/${selectedCid}?student=${item.stu_name}`) }}>查看成绩列表<Icon type="unordered-list" /></Button>
                            </div>
                        </Col>
                    </Row>
                )
            }
        ): <Row type="flex" justify="space-around" style={{background: '#fff', padding: '15px'}}><Col style={{lineHeight: '50px', textAlign:'center'}} span={8}>请先选择班级</Col></Row>

    },[ studentlists ])

    return (
        <div>
            <Layout>
                <Header><span>重点学生成绩统计图</span> <span onClick={logoutAction} style={{cursor:"pointer",float:'right', lineHeight:"64px"}}>退出<Icon type="logout" /></span></Header>
                <Content>
                    <Row type="flex" align="middle" justify="space-around" className={styles['header-bar']}>
                        <Col span={4} style={{ textAlign: 'right' }}>切换班级：</Col>
                        <Col span={16} className={styles['class-tag']}>
                            { cachedClassLists }
                            <Button type="default" onClick={() => { setClassVisible(true) }}>添加班级<Icon type="plus-circle" /></Button>
                            <Button type="default" onClick={() => { router.push('/class') }}>班级管理<Icon type="delete" /></Button>
                        </Col>
                        <Col span={4}>
                            <Icon style={{ fontSize: "24px", float: "left" }} type="bar-chart" />
                            <Switch defaultChecked={false} style={{ float: "left", margin: "1px 0 0 10px" }} onChange={(a) => { console.log(a) }} />
                        </Col>
                    </Row>
                    <Row type="flex" align="middle" justify="space-around" gutter={[0,20]} style={{ height: 90}}>
                        <Col span={4} style={{ textAlign: 'right' }}>添加重点学生：</Col>
                        <Col span={4}><Input placeholder="学生姓名，字数小于8" value={studentName} onChange={(e) => { setStudentName(e.target.value) }} /></Col>
                        <Col span={4}><Input placeholder="阶段末位次数，小于10" value={repetitions} onChange={(e) => { setRepetitions(e.target.value) }} /></Col>
                        <Col span={4}><Input placeholder="帮扶对象（可选）" /></Col>
                        <Col span={6}><Button onClick={addNewStudent}>添加<Icon type="plus-circle" theme="twoTone" /></Button></Col>
                    </Row>

                    { cachedStudentLists }

                    <Modal
                        title="添加日分析"
                        visible={recordVisible}
                        onOk={handleRecordOk}
                        confirmLoading={confirmLoading}
                        onCancel={handleRecordCancel}
                    >
                        <div>
                            <Row style={{ height: 40 }} type="flex" align="middle" justify="space-around">
                                <Col span={3}>选择日期</Col>
                                <Col span={21}>
                                    <DatePicker disabledDate={disabledDate} defaultValue={moment(new Date(), 'YYYY-MM-DD')} format={'YYYY-MM-DD'} value={addDate} onChange={(date)=>{setAddDate(date)}} />
                                    <Button onClick={() => { setAddDate(moment().subtract(1, 'days'), 'YYYY-MM-DD') }}>昨天</Button>
                                    <Button onClick={() => { setAddDate(moment().subtract(2, 'days'), 'YYYY-MM-DD') }}>前天</Button>
                                </Col>
                            </Row>
                            <Row style={{ height: 40 }} type="flex" align="middle" justify="space-around">
                                <Col span={3} style={{ textAlign: "right", lineHeight: "40px" }}>理论&nbsp;</Col>
                                <Col span={9}><Input value={theoryScore} onChange={(e) => { setTheoryScore(e.target.value) }} /></Col>
                                <Col span={3} style={{ textAlign: "right", lineHeight: "40px" }}>技能&nbsp;</Col>
                                <Col span={9}><Input value={skillScore} onChange={(e) => { setSkillScore(e.target.value) }} /></Col>
                            </Row>
                            <Row style={{ height: 40 }} type="flex" align="middle" justify="space-around">
                                <Col span={3}>成绩类型</Col>
                                <Col span={21}>
                                    <Radio.Group onChange={(e) => { setExamType(e.target.value) }} value={examType}>
                                        <Radio value={0}>日考</Radio>
                                        <Radio value={1}>周考</Radio>
                                    </Radio.Group>
                                </Col>
                            </Row>
                            <Row style={{ height: 80 }} type="flex" align="middle" justify="space-around">
                                <Col span={3}>解决方案</Col>
                                <Col span={21}>
                                    <TextArea value={analysis} onChange={(e) => { setAnalysis(e.target.value) }}></TextArea>
                                </Col>
                            </Row>
                        </div>
                    </Modal>
                    <Modal
                        title="添加班级"
                        visible={classVisible}
                        onOk={handleAddClassOk}
                        confirmLoading={confirmLoading}
                        onCancel={handleAddClassCancel}
                    >
                        <div>
                            <Row type="flex" align="middle" gutter={[0, 20]}><Col span={3}>班级号：</Col><Col span={18}><Input value={classname} onChange={(e) => { setClassname(e.target.value) }} /></Col></Row>
                            <Row type="flex" align="middle" gutter={[0, 20]}><Col span={3}>教室号：</Col><Col span={18}><Input value={classroom} onChange={(e) => { setClassroom(e.target.value) }} /></Col></Row>
                            <Row type="flex" align="middle" gutter={[0, 20]}><Col span={3}>辅导员：</Col><Col span={18}><Input value={assistant} onChange={(e) => { setAssistant(e.target.value) }} /></Col></Row>
                        </div>
                    </Modal>
                </Content>
            </Layout>

        </div>
    )
}

export default Home
