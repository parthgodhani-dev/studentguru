import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Headtitle from "./Headtitle";
import testimoServices from "../../../appwrite/awtestimo";


const Studentlove = () => {
	const prevRef = useRef(null);
	const nextRef = useRef(null);

	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchReviews = async () => {
		try {
			const response = await testimoServices.getAllTestimo();
			if (response && response.documents) {
				setReviews(response.documents);
			}
		} catch (error) {
			console.error("Error fetching testimonials:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchReviews();
	}, []);

	return (
		<>
			<div className="studentlove">
				<Container>
					<Row className="justify-content-center">
						<Col sm={10}>
							<Headtitle
								className="text-center"
								topTitle="Our Student Stories"
								title="Why Student Love Us ?"
								headingTag="h3"
								headingClass="maintitle"
								underline={true}
								underlineClass="underline"
								underlineText="Student Love Us"
							/>
						</Col>
					</Row>

					<div className="testimo_slider">
						<Row>
							<Col sm={12}>
								{loading ? (
									<div className="text-center py-4">
										<Spinner animation="border" />
									</div>
								) : (
									<div className="swiperslider">
										
										<button ref={prevRef} className="swiper-prev" aria-label="Previous"></button>

										<Swiper
											modules={[Navigation, Pagination, Autoplay]}
											slidesPerView={3}
											loop={true}
											speed={1000}
											autoplay={{
												delay: 500,
												disableOnInteraction: false,
											}}
											onInit={(swiper) => {
												swiper.params.navigation.prevEl = prevRef.current;
												swiper.params.navigation.nextEl = nextRef.current;
												swiper.navigation.init();
												swiper.navigation.update();
											}}
											breakpoints={{
												1200: { slidesPerView: 3 },
												1024: { slidesPerView: 2 },
												768: { slidesPerView: 2 },
												480: { slidesPerView: 1 },
												0: { slidesPerView: 1 },
											}}
										>
											{reviews.map((review) => (
												<SwiperSlide key={review.$id}>
													<div className="testimo">
														<div className="testimowrap">
															<div className="content" dangerouslySetInnerHTML={{ __html: review.content }}></div>
															<div className="botinfo">
																<div className="user">
																	<img
																		loading="lazy"
																		src={testimoServices.getFilePreview(review.userimg)}
																		alt={review.name}
																	/>
																</div>
																<div className="username">
																	<p>{review.name}</p>
																	<span>
																		{review.state}, {review.country}
																	</span>
																</div>
															</div>
														</div>
													</div>
												</SwiperSlide>
											))}
										</Swiper>

										<button ref={nextRef} className="swiper-next" aria-label="Next"></button>

									</div>
								)}
							</Col>
						</Row>
					</div>
				</Container>
			</div>
		</>
	);
};

export default Studentlove;
