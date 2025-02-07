import blogsData from "../data/blogs.json";

const Blogs = () => {
  return (
    <section className=" section__container blog__container">
      <h2 className=" section__header">Latest From Blogs</h2>
      <p className=" section__subheader">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim est
        blanditiis, animi culpa quisquam veritatis.
      </p>
      <div
        style={{ marginTop: "50px" }}
        className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 "
      >
        {blogsData.map((item, index) => (
          <div
            key={index}
            className=" blog__card cursor-pointer hover:scale-105 transition-all duration-300"
          >
            <img src={item?.imageUrl} alt="blog image" />
            <div className=" blog__card__content">
              <h6>{item?.subtitle}</h6>
              <h4>{item?.title}</h4>
              <p>{item?.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
