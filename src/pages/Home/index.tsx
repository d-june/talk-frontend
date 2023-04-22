import { ChatInput, Dialogs, Message, Sidebar } from "../../components";

import { Input } from "antd";
import {
  TeamOutlined,
  FormOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

// @ts-ignore
import styles from "./Home.module.scss";
import Status from "../../components/Status";

const Home = () => {
  return (
    <section className={styles.home}>
      <div className={styles.chat}>
        <Sidebar />
        <div className={styles.chatDialog}>
          <div className={styles.chatDialogHeader}>
            <div className={styles.chatDialogHeaderCenter}>
              <b className={styles.chatDialogHeaderUserName}>Somebody</b>
              <div className={styles.chatDialogHeaderStatus}>
                <Status online={true} />
              </div>
            </div>
            <EllipsisOutlined />
          </div>
          <div className={styles.chatDialogMessagesBlock}>
            <div className={styles.chatDialogMessages}>
              <Message
                avatar="https://us.123rf.com/450wm/paputekwallart/paputekwallart2212/paputekwallart221200146/195324880-hipster-cute-funny-art-cat-illustration.jpg?ver=6"
                text="Привет всем!) Как дела?"
                date={new Date("April 16, 2023 15:24:00")}
                attachments={[
                  {
                    filename: "image.jpg",
                    url: "https://media.istockphoto.com/id/1146517111/photo/taj-mahal-mausoleum-in-agra.jpg?s=612x612&w=0&k=20&c=vcIjhwUrNyjoKbGbAQ5sOcEzDUgOfCsm9ySmJ8gNeRk=",
                  },
                  {
                    filename: "image.jpg",
                    url: "https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=",
                  },
                  {
                    filename: "image.jpg",
                    url: "https://media.istockphoto.com/id/1093110112/photo/picturesque-morning-in-plitvice-national-park-colorful-spring-scene-of-green-forest-with-pure.jpg?s=612x612&w=0&k=20&c=lpQ1sQI49bYbTp9WQ_EfVltAqSP1DXg0Ia7APTjjxz4=",
                  },
                ]}
              />
              <Message
                avatar="https://us.123rf.com/450wm/paputekwallart/paputekwallart2212/paputekwallart221200146/195324880-hipster-cute-funny-art-cat-illustration.jpg?ver=6"
                date={new Date("April 16, 2023 15:24:00")}
                attachments={[
                  {
                    filename: "image.jpg",
                    url: "https://media.istockphoto.com/id/1146517111/photo/taj-mahal-mausoleum-in-agra.jpg?s=612x612&w=0&k=20&c=vcIjhwUrNyjoKbGbAQ5sOcEzDUgOfCsm9ySmJ8gNeRk=",
                  },
                ]}
              />
              <Message
                avatar="https://us.123rf.com/450wm/paputekwallart/paputekwallart2212/paputekwallart221200146/195324880-hipster-cute-funny-art-cat-illustration.jpg?ver=6"
                text="Привет всем!) Как дела?"
                date={new Date("April 16, 2023 15:24:00")}
              />
              <Message
                avatar="https://t3.ftcdn.net/jpg/05/65/13/74/360_F_565137466_AnFDfYMQpA04vS4IFzTB6wDy3RnZo5Zc.jpg"
                text="Привет всем!) Как дела? svbweovbwevb evhweuhvpweuh puvhpwevpweoweb"
                date={new Date("April 16, 2023 15:24:00")}
                isMe={true}
                isReaded={true}
              />
              <Message
                avatar={
                  "https://us.123rf.com/450wm/paputekwallart/paputekwallart2212/paputekwallart221200146/195324880-hipster-cute-funny-art-cat-illustration.jpg?ver=6"
                }
                date={new Date("April 16, 2023 15:24:00")}
                audio="https://nzt6ku-a.akamaihd.net/downloads/ringtones/files/mp3/vid-108101012-025627-374-1-59843.mp3"
              />
              <Message
                avatar="https://t3.ftcdn.net/jpg/05/65/13/74/360_F_565137466_AnFDfYMQpA04vS4IFzTB6wDy3RnZo5Zc.jpg"
                text="Привет всем!) Как дела? svbweovbwevb evhweuhvpweuh puvhpwevpweoweb"
                date={new Date("April 16, 2023 15:24:00")}
                isMe={true}
                isReaded={false}
              />
              <Message
                avatar="https://us.123rf.com/450wm/paputekwallart/paputekwallart2212/paputekwallart221200146/195324880-hipster-cute-funny-art-cat-illustration.jpg?ver=6"
                isTyping
              />
            </div>

            <div className={styles.chatDialogInput}>
              <ChatInput />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
