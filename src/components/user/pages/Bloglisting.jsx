import React, { useEffect, useState } from "react"
import { Col, Container, Row, Card, Form } from "react-bootstrap"
import { IconSearch } from "@tabler/icons-react"
import blogServices from "../../../appwrite/awblog"
import Headtitle from "../common/Headtitle"
import Blogcard from "../common/Blogcard"

const Bloglisting = () => {
    const [blogs, setBlogs] = useState([])
    const [allTags, setAllTags] = useState([])
    const [selectedTag, setSelectedTag] = useState("all")
    const [searchTerm, setSearchTerm] = useState("")
    const [sortOrder, setSortOrder] = useState()

    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await blogServices.getAllBlogs(sortOrder);
            setBlogs(response.documents || []);
        };
        fetchBlogs();
    }, [sortOrder]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await blogServices.getAllBlogs()
            const docs = response.documents || []
            setBlogs(docs)

            console.log(response.documents[0].$createdAt);
            

            // ✅ Collect all tags
            const allTagsArray = docs.flatMap((blog) => {
                let tags = []
                if (typeof blog.tags === "string") {
                    tags = blog.tags.split(",").map(t => t.trim())
                } else if (Array.isArray(blog.tags)) {
                    tags = blog.tags
                }
                return tags.filter(tag => tag !== "")
            })

            // ✅ Remove duplicates
            const uniqueTags = [...new Set(allTagsArray)]
            setAllTags(uniqueTags)
        }

        fetchBlogs()
    }, [])

    // ✅ Filter blogs by tag + search term
    const filteredBlogs = blogs.filter((blog) => {
        // --- Tag filtering ---
        let tags = []
        if (typeof blog.tags === "string") {
            tags = blog.tags.split(",").map((t) => t.trim().toLowerCase())
        } else if (Array.isArray(blog.tags)) {
            tags = blog.tags.map((t) => t.toLowerCase())
        }

        const matchTag =
            selectedTag === "all" ? true : tags.includes(selectedTag.toLowerCase())

        // --- Search filtering ---
        const search = searchTerm.trim().toLowerCase()

        // Combine all searchable text
        const title = blog.title?.toLowerCase() || ""
        const shortcontent = blog.shortcontent?.toLowerCase() || ""
        const fullcontent = blog.content?.toLowerCase() || ""

        // ✅ Check if the search text exists anywhere
        const matchSearch =
            !search ||
            title.includes(search) ||
            shortcontent.includes(search) ||
            fullcontent.includes(search) ||
            tags.some((t) => t.includes(search))

        // ✅ Must match both tag and search
        return matchTag && matchSearch
    })

    return (
        <section className="blog_listing">
            <Container>
                <Row>
                    <Col sm={12}>
                        <Headtitle
                            className="text-center"
                            topTitle="Get Started With a Free courses"
                            title="Our Latest Tutorial"
                            headingTag="h1"
                            headingClass="maintitle"
                            underline={true}
                            underlineClass="underline"
                            underlineText="Latest Tutorial"
                            subTitle="Our Latest courses and Learning Resources"
                        />
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    
                    <Col sm={9}>
                        <div className="d-flex align-items-center gap-3 flex-wrap">
                            <Blogcard key={blogs.$id} blogs={filteredBlogs} />
                        </div>
                    </Col>

                    <Col sm={3}>

                        <div className="sidebar">
                            <div className="box">
                                <h6>Search</h6>
                                <Form.Group className="mb-3 field search" controlId="formBasicEmail">
                                    <IconSearch stroke={1} width={20} height={20} />
                                    <Form.Control
                                        type="text"
                                        placeholder="Search..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </Form.Group>
                            </div>
                            <div className="box">
                                <h6>Tags</h6>
                                <div className="taglist">
                                    <span
                                        className={`tag ${selectedTag === "all" ? "active" : ""}`}
                                        onClick={() => setSelectedTag("all")}
                                    >
                                        All
                                    </span>
                                    {allTags.map((tag) => (
                                        <span
                                            key={tag}
                                            className={`tag ${selectedTag === tag ? "active" : ""}`}
                                            onClick={() => setSelectedTag(tag)}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="box">
                                <h6>Set order</h6>
                                <Form.Group className="mb-3 field search" controlId="formBasicEmail">
                                    <Form.Select
                                        value={sortOrder}
                                        onChange={(e) => setSortOrder(e.target.value)}
                                        className="mb-3"
                                    >
                                        <option value="desc">Newest First</option>
                                        <option value="asc">Oldest First</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Bloglisting
