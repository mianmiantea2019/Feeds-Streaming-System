import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import mediaApi from "../../api/modules/media.api";
import AutoSwiper from "./AutoSwiper";
import { toast } from "react-toastify";
import MediaItem from "./MediaItem";
import newsApi from "../../api/modules/news.api";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import HotRanking from "./HotRanking";

const NewsSlide = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  useEffect(() => {
    const getArticles = async () => {
      try {
        const data = await newsApi.getNewsDetail();
        setArticles(data.response.articles.slice(0, 61));
      } catch (error) {
        toast.error(error.message);
      }
    };

    getArticles();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle + 1,
    indexOfLastArticle + 1
  );

  return (
    <section>
      {articles.length > 0 ? (
        <Stack>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <NewsCardHero {...articles[0]} />
            </Grid>
            <Grid item md={4}>
              <HotRanking />
            </Grid>
            <Grid item xs={12} md={12}>
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}>
                Previous Page
              </Button>
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={indexOfLastArticle >= articles.length - 1}>
                Next Page
              </Button>
            </Grid>
            {currentArticles.slice(0, 6).map((news, index) => (
              <Grid item xs={12} md={4} key={index}>
                <NewsCard {...news} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      ) : null}
    </section>
  );
};

const NewsCard = ({
  title,
  description,
  url,
  urlToImage,
  author,
  publishedAt,
}) => {
  return (
    <Card style={{ outline: "none", boxShadow: "none" }}>
      <CardMedia
        component="img"
        alt={author}
        src={urlToImage}
        style={{ width: 439, height: 247,borderRadius:'15px' }}
        onError={(e) =>
          (e.target.src =
            "https://media4.s-nbcnews.com/j/newscms/2019_01/2705191/nbc-social-default_b6fa4fef0d31ca7e8bc7ff6d117ca9f4.nbcnews-fp-1024-512.png")
        }
      />
      <CardContent>
        <div>
          <Typography variant="subtitle1" color="textSecondary">
            <span
              href="tech-category-01.html"
              title={author}
              style={{ textDecoration: "none" }}>
              {author} <span>{publishedAt.slice(0, 10)}</span>
            </span>
          </Typography>
          <Typography variant="h5">
            <Link href={url} title="" style={{ textDecoration: "none" }}>
              {title}
            </Link>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {description}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

const NewsCardHero = ({
  title,
  description,
  url,
  urlToImage,
  author,
  publishedAt,
}) => {
  return (
    <Card style={{ outline: "none", boxShadow: "none" }}>
      <CardMedia component="img" alt={author} src={urlToImage}  style={{ borderRadius:'15px' }}/>
      <CardContent>
        <div>
          <Typography variant="subtitle1" color="textSecondary">
            <span
              href="tech-category-01.html"
              title={author}
              style={{ textDecoration: "none" }}>
              {author} <span>{publishedAt.slice(0, 10)}</span>
            </span>
          </Typography>
          <Typography variant="h5">
            <Link href={url} title="" style={{ textDecoration: "none" }}>
              {title}
            </Link>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {description}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};
export default NewsSlide;
