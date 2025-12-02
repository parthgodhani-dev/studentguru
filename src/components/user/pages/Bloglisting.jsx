import React, { useEffect, useState, useMemo } from "react"
import { Col, Container, Row, Card, Form } from "react-bootstrap"
import { IconSearch } from "@tabler/icons-react"
import blogServices from "../../../appwrite/awblog"
import Headtitle from "../common/Headtitle"
import Blogcard from "../common/Blogcard"
import Loader from "../../Loader"

const Bloglisting = () => {
    const [blogs, setBlogs] = useState([])
    const [allTags, setAllTags] = useState([])
    const [selectedTag, setSelectedTag] = useState("all")
    const [searchTerm, setSearchTerm] = useState("")
    const [sortOrder, setSortOrder] = useState("desc")
    const [loading, setLoading] = useState(true);

    // -------------------------------
    // Helper: Parse blog tags safely
    // -------------------------------
    const getTags = (tags) => {
        if (Array.isArray(tags)) return tags.map(t => t.toLowerCase().trim())
        if (typeof tags === "string") {
            return tags
                .split(",")
                .map(t => t.toLowerCase().trim())
                .filter(t => t !== "")
        }
        return []
    }

    // -------------------------------
    // Fetch blogs only once + sorting
    // -------------------------------
    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await blogServices.getAllBlogs(sortOrder)
            const docs = response.documents || []

            setBlogs(docs)

            // Collect all tags
            const tagList = docs.flatMap(blog => getTags(blog.tags))
            setAllTags([...new Set(tagList)]) // unique tags

            setLoading(false);
        }

        fetchBlogs()
    }, [sortOrder])

    // -----------------------------------
    // Filtered blogs (memoized for speed)
    // -----------------------------------
    const filteredBlogs = useMemo(() => {
        const search = searchTerm.trim().toLowerCase()

        return blogs.filter(blog => {
            const tags = getTags(blog.tags)

            const matchTag =
                selectedTag === "all" ? true : tags.includes(selectedTag.toLowerCase())

            const title = blog.title?.toLowerCase() || ""
            const shortcontent = blog.shortcontent?.toLowerCase() || ""
            const fullcontent = blog.content?.toLowerCase() || ""

            const matchSearch =
                !search ||
                title.includes(search) ||
                shortcontent.includes(search) ||
                fullcontent.includes(search) ||
                tags.some(t => t.includes(search))

            return matchTag && matchSearch
        })
    }, [blogs, selectedTag, searchTerm])


    if (loading) return <Loader message="Loading..." />;
    
    return (
        <section className="blog_listing">
            <Container>
                <Row>
                    <Col md={12}>
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

                <Row className="justify-content-center flex-md-row flex-column-reverse gap-md-0 gap-4">
                    {/* Blog list */}
                    <Col lg={9} md={8}>
                        <Row className="blogrow">
                            <Blogcard blogs={filteredBlogs} />
                        </Row>
                    </Col>

                    {/* Sidebar */}
                    <Col lg={3} md={4}>
                        <div className="sidebar">

                            {/* Search */}
                            <div className="box">
                                <h6>Search</h6>
                                <Form.Group className="field search">
                                    <IconSearch stroke={1} width={20} height={20} />
                                    <Form.Control
                                        type="text"
                                        placeholder="Search..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </Form.Group>
                            </div>

                            {/* Tags */}
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

                            {/* Sort Order */}
                            <div className="box">
                                <h6>Set order</h6>
                                <Form.Group>
                                    <Form.Select
                                        value={sortOrder}
                                        onChange={(e) => setSortOrder(e.target.value)}
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
