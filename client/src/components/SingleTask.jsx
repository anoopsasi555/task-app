import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Spin, Button, Typography, Tag, Image } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import moment from "moment";
import { api, BASE_URL } from "../axios/axios";

const { Title, Paragraph, Text } = Typography;

const TaskDetails = () => {
  const { taskId } = useParams(); 
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.get(`tasks/${taskId}`);
        const imgArr = response.data?.image?.split("/");
        imgArr?.length && setImage(imgArr[imgArr?.length - 1]);
        setTask(response.data);
      } catch (error) {
        console.error("Error fetching task details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  if (loading) {
    return (
      <Spin
        size="large"
        style={{ display: "flex", justifyContent: "center", marginTop: "20%" }}
      />
    );
  }

  if (!task) {
    return <div>Task not found</div>;
  }

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Button
        type="primary"
        icon={<ArrowLeftOutlined />}
        onClick={handleBack}
        style={{ marginBottom: "20px" }}
      >
        Back to List
      </Button>
      <Card
        title={<Title level={2}>{task.heading}</Title>}
        bordered={false}
        style={{
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Paragraph>
          <Text strong>Description: </Text>
          {task.description || "No description provided"}
        </Paragraph>
        <Paragraph>
          <Text strong>Date: </Text>
          {moment(task.date).format("MMMM Do, YYYY")}
        </Paragraph>
        <Paragraph>
          <Text strong>Time: </Text>
          {moment(task.time, "HH:mm").format("hh:mm A")}
        </Paragraph>
        <Paragraph>
          <Text strong>Priority: </Text>
          {task?.priority === "high" && <Tag color="red">High</Tag>}
          {task?.priority === "medium" && <Tag color="orange">Medium</Tag>}
          {task?.priority === "low" && <Tag color="green">Low</Tag>}
        </Paragraph>
        {task?.image && (
          <div>
            <Image alt="task-image" width={500} src={BASE_URL + image}></Image>
          </div>
        )}
      </Card>
    </div>
  );
};

export default TaskDetails;
