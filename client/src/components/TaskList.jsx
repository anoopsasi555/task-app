import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Upload,
  message,
  Image,
  TimePicker,
  Tag,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { api, BASE_URL } from "../axios/axios";
import dayjs from "dayjs";
import { fileNameFromPath } from "../utils/fileNameFromPath";
import { Link } from "react-router-dom";
import "./taskList.css";

const { Option } = Select;
const { TextArea } = Input;

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [editMode, setEditMode] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [time, setTime] = useState(null);

  const timeFormat = "HH:mm";

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      Promise.reject(error);
    }
  };

  const handleEdit = (task) => {
    setEditMode(true);
    setEditTask(task);
    const file = { name: fileNameFromPath(task?.image) };
    file?.name && setFileList([file]);
    form.setFieldsValue({
      heading: task.heading,
      description: task.description,
      date: dayjs(task.date),
      priority: task.priority,
      image: task.image,
      time: dayjs(task.time, timeFormat),
    });
    setTime(task.time);
    setVisible(true);
  };

  const handleAdd = () => {
    form.resetFields();
    setTime();
    setFileList([]);
    setEditMode(false);
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = async (values) => {
    try {
      const file = values.image;

      delete values.image;
      delete values.time;

      const formData = new FormData();
      Object.keys(values)?.forEach((key) => {
        values[key] && formData.append(key, values[key]);
      });
      file?.file && formData.append("image", file.file);

      console.log("time", time);
      formData.append("time", time);
      if (editMode) {
        await api.put(`/tasks/${editTask.id}`, formData, {
          headers: { "Content-Type": "multipart/formdata" },
        });
        message.success("Task updated successfully");
      } else {
        await api.post("/tasks", formData, {
          headers: { "Content-Type": "multipart/formdata" },
        });

        message.success("Task added successfully");
        form.resetFields();
      }
      setVisible(false);
      fetchTasks();
      setTime(null);
      setFileList([]);
    } catch (error) {
      console.log(error);
      message.error("Failed to add task");
    }
  };

  const columns = [
    {
      title: "Heading",
      dataIndex: "heading",
      key: "heading",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      filters: [
        { text: "High", value: "high" },
        { text: "Medium", value: "medium" },
        { text: "Low", value: "low" },
      ],
      onFilter: (value, record) => record.priority === value,
      render: (text) => (
        <span>
          {text === "high" && <Tag color="red">High</Tag>}
          {text === "medium" && <Tag color="orange">Medium</Tag>}
          {text === "low" && <Tag color="green">Low</Tag>}
        </span>
      ),
    },
    {
      title: "Image",
      key: "image",
      dataIndex: "img",
      render: (_, record) => {
        const image = record?.image?.split("/")[1];
        return (
          <Image alt="task-img" width={200} src={`${BASE_URL + image}`}></Image>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span>
          <Button icon={<EyeOutlined />}>
            <Link to={`/task/${record.id}`}>View Details</Link>
          </Button>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="task-head">
        <h2>Tasks</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Task
        </Button>
      </div>
      <Table
        pagination={false}
        columns={columns}
        dataSource={tasks}
        loading={loading}
        rowKey="id"
      />
      <Modal
        title="Add Task"
        open={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="heading"
            label="Heading"
            rules={[{ required: true, message: "Please enter heading" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <TextArea rows={5} />
          </Form.Item>
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: "Please select a date" }]}
          >
            <DatePicker value={""} defaultValue={null} />
          </Form.Item>
          <Form.Item
            name="time"
            label="Time"
            rules={[{ required: true, message: "Please select a time" }]}
          >
            <TimePicker
              value={time}
              format={timeFormat}
              onChange={(date, value) => setTime(value)}
            />
          </Form.Item>
          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true, message: "Please select priority" }]}
          >
            <Select>
              <Option value="high">High</Option>
              <Option value="medium">Medium</Option>
              <Option value="low">Low</Option>
            </Select>
          </Form.Item>
          <Form.Item name="image" label="Image">
            <Upload
              onChange={(e) => setFileList(e.fileList)}
              fileList={fileList}
              maxCount={1}
              accept="image/*"
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editMode ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TaskList;
