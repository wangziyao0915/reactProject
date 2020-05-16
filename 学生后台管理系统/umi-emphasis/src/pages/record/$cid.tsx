import React, { useEffect, useState } from 'react'
import { connect } from 'dva'
import { Layout, Row, Col, Table, Divider, Select, Button, DatePicker, Input, Radio, Modal, Popconfirm } from 'antd'
import moment from 'moment'
const { Header, Content } = Layout
const { Option } = Select;
let { TextArea } = Input

const Record = (props: any) => {
  let { match, location, fetchRecord, deleteRecord, record, students } = props;
  let [student, setStudent] = useState(location.query.student)
  let [isLoading, setLoading] = useState(true)
  let [confirmLoading, setConfirmLoading] = useState(false)
  
  let [recordlists, setRecordLists] = useState([])
  let [recordVisible, setRecordVisible] = useState(false)
  let [theoryScore, setTheoryScore] = useState('')
  let [skillScore, setSkillScore] = useState('')
  let [analysis, setAnalysis] = useState('')
  let [examType, setExamType] = useState(0)
  let [addDate, setAddDate] = useState(moment(new Date(), 'YYYY-MM-DD'))


  useEffect(() => {
    fetchRecord(match.params.cid)
  }, [])

  useEffect(() => {
    setRecordLists(record[student]);
    setLoading(false)
  }, [record,student])

  let onSearch = () => { }

  let editRecord = (record:any)=>{
    setAddDate(moment(new Date(record.record_date), 'YYYY-MM-DD'))
    setTheoryScore(record.theory_score)
    setSkillScore(record.skill_score)
    setAnalysis(record.analysis)
    setExamType(record.week_record)
    setRecordVisible(true)
  }
  let handleRecordOk = ()=>{
    setRecordVisible(false)
  }
  let handleRecordCancel = ()=>{
    setRecordVisible(false)
  }

  const columns = [
    {
      title: '日期',
      dataIndex: 'record_date',
      key: 'record_date',
      align: 'center',
      render: (text: string) => <span>{text}</span>
    },
    {
      title: '理论',
      dataIndex: 'theory_score',
      key: 'theory_score',
      align: 'center',
    },
    {
      title: '技能',
      dataIndex: 'skill_score',
      key: 'skill_score',
      align: 'center',
    },
    {
      title: '是否周考',
      dataIndex: 'week_record',
      key: 'week_record',
      render: (text: number) => <span>{text === 0 ? '日考' : "周考"}</span>,
      align: 'center',
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (text: string, record: any) => {
        return (
        <span>
          <Button type="default" size="small" onClick={()=>{editRecord(record)}}>编辑</Button>
          <Divider type="vertical" />
          <Popconfirm
            title="确实要删除这条记录吗?"
            onConfirm={()=>{deleteRecord(recordlists[0]['stuid'], record.record_id, match.params.cid );}}
            onCancel={()=>{}}
            okText="Yes"
            cancelText="No"
          >
            <Button type="default" size="small">删除</Button>
          </Popconfirm>
          
        </span>
        )
      },
    },
  ];

  return (
    <Layout>
      <Header>成绩管理</Header>
      <Content style={{background:"#fff"}}>
        <Row type="flex" justify="space-around" style={{lineHeight: "50px"}}>
          <Col span={8}>讲师：XX  <Divider  type="vertical"/> 学生：{student}</Col>
          <Col span={8}>
            切换学生：
            <Select
              showSearch={true}
              defaultValue={student}
              style={{ width: 200 }}
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={(value:any)=>setStudent(value)}
              onSearch={onSearch}
            >
              {students.map((item:string, index:number)=><Option value={item} key={index}>{item}</Option>)}
            </Select>
          </Col>
        </Row>
        <Table loading={isLoading} columns={columns} dataSource={recordlists} rowKey={'record_id'} expandedRowRender={record => <p style={{ margin: 0 }}>{record.analysis}</p>} />
        <Modal
            title="编辑日分析"
            visible={recordVisible}
            onOk={handleRecordOk}
            confirmLoading={confirmLoading}
            onCancel={handleRecordCancel}
        >
            <div>
                <Row style={{ height: 40 }} type="flex" align="middle" justify="space-around">
                    <Col span={3}>选择日期</Col>
                    <Col span={21}>
                        <DatePicker disabled={true} defaultValue={moment(new Date(), 'YYYY-MM-DD')} format={'YYYY-MM-DD'} value={addDate} />
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
                        <TextArea value={analysis} onChange={(e:any) => { setAnalysis(e.target.value) }}/>
                    </Col>
                </Row>
            </div>
        </Modal>
      </Content>
    </Layout>
  )
}

export default connect((state: any) => {
  
  return {
    record: state.record,
    students: Object.keys(state.record)
  }
}, (dispatch) => {
  return {
    fetchRecord(cid: string) {
      dispatch({
        type: 'record/FETCH_RECORD_LIST',
        payload: cid
      })
    },
    deleteRecord(stuid:string, record_id:string, cid:string){
      dispatch({
        type:"record/DELETE_RECORD_LIST",
        payload:{stuid, record_id:record_id.toString(), cid}
      })
    }
  }
})(Record)
