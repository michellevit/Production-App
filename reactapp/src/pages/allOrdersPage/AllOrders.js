import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllOrders.css";
import AllOrdersNav from "./AllOrdersNav";
import EditShipDateButton from "./EditShipDateButton";
import UnshipButton from "./UnshipButton";
import DeleteButton from "./DeleteButton";
import QuoteFlag from "./QuoteFlag";
import Pagination from "./Pagination";

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentView, setCurrentView] = useState("all-orders");
  const [currentDate, setCurrentDate] = useState("");
  const [refreshOrders, setRefreshOrders] = useState(false);
  const [readyChecked, setReadyChecked] = useState(true);
  const [notReadyChecked, setNotReadyChecked] = useState(true);
  const [shippedChecked, setShippedChecked] = useState(true);
  const [notShippedChecked, setNotShippedChecked] = useState(true);
  const [delayedChecked, setDelayedChecked] = useState(true);
  const [oldestChecked, setOldestChecked] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [fadingRows, setFadingRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryFormatted, setSearchQueryFormatted] = useState("");
  const ordersPerPage = 20;

  useEffect(() => {
    const formattedDate = new Date();
    setCurrentDate(formattedDate);
    const fetchAllOrders = () => {
      axios
        .get(`http://127.0.0.1:8000/${currentView}/?page=${currentPage}${searchQueryFormatted}`)
        .then((response) => {
          let filteredAllOrders = response.data.results;
          setTotalPages(Math.ceil(response.data.count / ordersPerPage));        
          setAllOrders(filteredAllOrders);
        })
        .catch((error) => {
          console.error("Error getting data", error);
        });
    };
    fetchAllOrders();
    setRefreshOrders(false);
  }, [
    readyChecked,
    notReadyChecked,
    shippedChecked,
    notShippedChecked,
    delayedChecked,
    oldestChecked,
    refreshOrders,
    currentPage,
  ]);

  // const applySorting = (filteredAllOrders) => {
  //   let filterByAll = false;
  //   let filterByUpcoming = false;
  //   let filterByPast = false;
  //   let filterByToday = false;
  //   let filterByTomorrow = false;
  //   let filterByThisWeek = false;
  //   let filterByNextWeek = false;
  //   let filterByThisMonth = false;
  //   let filterByLastWeek = false;
  //   let filterByLastMonth = false;
  //   switch (sortOption) {
  //     case "All":
  //       filterByAll = true;
  //       break;
  //     case "Upcoming":
  //       filterByUpcoming = true;
  //       break;
  //     case "Past":
  //       filterByPast = true;
  //       break;
  //     case "Today":
  //       filterByToday = true;
  //       break;
  //     case "Tomorrow":
  //       filterByTomorrow = true;
  //       break;
  //     case "This-Week":
  //       filterByThisWeek = true;
  //       break;
  //     case "Next-Week":
  //       filterByNextWeek = true;
  //       break;
  //     case "This-Month":
  //       filterByThisMonth = true;
  //       break;
  //     case "Last-Week":
  //       filterByLastWeek = true;
  //       break;
  //     case "Last-Month":
  //       filterByLastMonth = true;
  //       break;
  //     default:
  //       filterByAll = true;
  //   }
  //   if (readyChecked && notReadyChecked && delayedChecked) {
  //     filteredAllOrders = filteredAllOrders.filter(
  //       (order) => order.ready != null
  //     );
  //   }
  //   if (readyChecked && !notReadyChecked && !delayedChecked) {
  //     filteredAllOrders = filteredAllOrders.filter(
  //       (order) => order.ready === true
  //     );
  //   }
  //   if (readyChecked && notReadyChecked && !delayedChecked) {
  //     filteredAllOrders = filteredAllOrders.filter(
  //       (order) =>
  //         order.ready != null &&
  //         order.delay_date === null &&
  //         order.delay_tbd === false
  //     );
  //   }
  //   if (readyChecked && !notReadyChecked && delayedChecked) {
  //     filteredAllOrders = filteredAllOrders.filter(
  //       (order) => order.ready === true
  //     );
  //   }
  //   if (!readyChecked && notReadyChecked && delayedChecked) {
  //     filteredAllOrders = filteredAllOrders.filter(
  //       (order) => order.ready === false
  //     );
  //   }
  //   if (!readyChecked && notReadyChecked && !delayedChecked) {
  //     filteredAllOrders = filteredAllOrders.filter(
  //       (order) =>
  //         order.ready === false &&
  //         order.delay_date === null &&
  //         order.delay_tbd === false
  //     );
  //   }
  //   if (!readyChecked && !notReadyChecked && delayedChecked) {
  //     filteredAllOrders = filteredAllOrders.filter(
  //       (order) => order.delay_date != null || order.delay_tbd === true
  //     );
  //   }
  //   if (!readyChecked && !notReadyChecked && !delayedChecked) {
  //     filteredAllOrders = filteredAllOrders.filter(
  //       (order) => order.ready === null
  //     );
  //   }
  //   if (shippedChecked && notShippedChecked) {
  //   } else if (shippedChecked && !notShippedChecked) {
  //     filteredAllOrders = filteredAllOrders.filter(
  //       (order) => order.shipped === true
  //     );
  //   } else if (!shippedChecked && notShippedChecked) {
  //     filteredAllOrders = filteredAllOrders.filter(
  //       (order) => order.shipped === false
  //     );
  //   } else {
  //     filteredAllOrders = [];
  //   }
  //   if (filterByUpcoming) {
  //     filteredAllOrders = filteredAllOrders.filter((order) => {
  //       const orderDate = new Date(order.ship_date);
  //       orderDate.setUTCHours(0, 0, 0, 0);
  //       const orderDateTimestamp = orderDate.getTime();
  //       const today = new Date(currentDate);
  //       today.setUTCHours(0, 0, 0, 0);
  //       const todayTimestamp = today.getTime();

  //       return orderDateTimestamp >= todayTimestamp;
  //     });
  //   }
  //   if (filterByPast) {
  //     filteredAllOrders = filteredAllOrders.filter((order) => {
  //       const orderDate = new Date(order.ship_date);
  //       orderDate.setUTCHours(0, 0, 0, 0);
  //       const orderDateTimestamp = orderDate.getTime();
  //       const today = new Date(currentDate);
  //       today.setUTCHours(0, 0, 0, 0);
  //       const todayTimestamp = today.getTime();
  //       return orderDateTimestamp < todayTimestamp;
  //     });
  //   }
  //   if (filterByToday) {
  //     const today = new Date(currentDate);
  //     today.setUTCHours(0, 0, 0, 0);
  //     const todayTimestamp = today.getTime();
  //     filteredAllOrders = filteredAllOrders.filter((order) => {
  //       const orderDate = new Date(order.ship_date);
  //       orderDate.setUTCHours(0, 0, 0, 0);
  //       const orderDateTimestamp = orderDate.getTime();
  //       return orderDateTimestamp === todayTimestamp;
  //     });
  //   }
  //   if (filterByTomorrow) {
  //     const tomorrow = new Date(currentDate);
  //     tomorrow.setDate(tomorrow.getDate() + 1);
  //     tomorrow.setUTCHours(0, 0, 0, 0);
  //     const tomorrowTimestamp = tomorrow.getTime();
  //     filteredAllOrders = filteredAllOrders.filter((order) => {
  //       const orderDate = new Date(order.ship_date);
  //       orderDate.setUTCHours(0, 0, 0, 0);
  //       const orderDateTimestamp = orderDate.getTime();
  //       return orderDateTimestamp === tomorrowTimestamp;
  //     });
  //   }
  //   if (filterByThisWeek) {
  //     const today = new Date(currentDate);
  //     const currentDayOfWeek = today.getDay();
  //     const daysUntilSunday = 7 - currentDayOfWeek;
  //     let startOfWeek = new Date(today);
  //     let endOfWeek = new Date(today);
  //     if (currentDayOfWeek === 0) {
  //       startOfWeek.setDate(today.getDate());
  //       endOfWeek.setDate(today.getDate() + 6);
  //     } else {
  //       startOfWeek.setDate(today.getDate() - currentDayOfWeek);
  //       endOfWeek.setDate(today.getDate() + daysUntilSunday - 1);
  //     }
  //     startOfWeek.setUTCHours(0, 0, 0, 0);
  //     endOfWeek.setUTCHours(23, 59, 59, 999);
  //     filteredAllOrders = filteredAllOrders.filter((order) => {
  //       const orderDate = new Date(order.ship_date);
  //       orderDate.setUTCHours(0, 0, 0, 0);
  //       return orderDate >= startOfWeek && orderDate <= endOfWeek;
  //     });
  //   }
  //   if (filterByNextWeek) {
  //     const today = new Date(currentDate);
  //     const currentDayOfWeek = today.getDay();
  //     const daysUntilSunday = 7 - currentDayOfWeek;
  //     let startOfNextWeek = new Date(today);
  //     let endOfNextWeek = new Date(today);
  //     if (currentDayOfWeek === 0) {
  //       startOfNextWeek.setDate(today.getDate() + 7);
  //       endOfNextWeek.setDate(today.getDate() + 13);
  //     } else {
  //       startOfNextWeek.setDate(today.getDate() + daysUntilSunday);
  //       endOfNextWeek.setDate(today.getDate() + daysUntilSunday + 6);
  //     }
  //     startOfNextWeek.setUTCHours(0, 0, 0, 0);
  //     endOfNextWeek.setUTCHours(23, 59, 59, 999);
  //     filteredAllOrders = filteredAllOrders.filter((order) => {
  //       const orderDate = new Date(order.ship_date);
  //       orderDate.setUTCHours(0, 0, 0, 0);
  //       return orderDate >= startOfNextWeek && orderDate <= endOfNextWeek;
  //     });
  //   }
  //   if (filterByThisMonth) {
  //     const startOfMonth = new Date(currentDate);
  //     startOfMonth.setDate(1);
  //     startOfMonth.setUTCHours(0, 0, 0, 0);
  //     const endOfMonth = new Date(currentDate);
  //     endOfMonth.setMonth(endOfMonth.getMonth() + 1);
  //     endOfMonth.setDate(0);
  //     endOfMonth.setUTCHours(23, 59, 59, 999);
  //     filteredAllOrders = filteredAllOrders.filter((order) => {
  //       const orderDate = new Date(order.ship_date);
  //       orderDate.setUTCHours(0, 0, 0, 0);
  //       return orderDate >= startOfMonth && orderDate <= endOfMonth;
  //     });
  //   }
  //   if (filterByLastWeek) {
  //     const today = new Date(currentDate);
  //     const currentWeekStart = new Date(today);
  //     currentWeekStart.setDate(today.getDate() - today.getDay());
  //     currentWeekStart.setUTCHours(0, 0, 0, 0);
  //     const lastWeekEnd = new Date(currentWeekStart);
  //     lastWeekEnd.setDate(currentWeekStart.getDate() - 1);
  //     lastWeekEnd.setUTCHours(23, 59, 59, 999);
  //     const lastWeekStart = new Date(lastWeekEnd);
  //     lastWeekStart.setDate(lastWeekEnd.getDate() - 6);
  //     lastWeekStart.setUTCHours(0, 0, 0, 0);
  //     filteredAllOrders = filteredAllOrders.filter((order) => {
  //       const orderDate = new Date(order.ship_date);
  //       orderDate.setUTCHours(0, 0, 0, 0);
  //       return orderDate >= lastWeekStart && orderDate <= lastWeekEnd;
  //     });
  //   }
  //   if (filterByLastMonth) {
  //     const today = new Date(currentDate);
  //     const currentMonthStart = new Date(today);
  //     currentMonthStart.setUTCHours(0, 0, 0, 0);
  //     currentMonthStart.setDate(1);
  //     const lastMonthEnd = new Date(currentMonthStart - 1);
  //     lastMonthEnd.setUTCHours(23, 59, 59, 999);
  //     lastMonthEnd.setDate(lastMonthEnd.getDate() - 1);
  //     const lastMonthStart = new Date(lastMonthEnd);
  //     lastMonthStart.setDate(1);
  //     lastMonthStart.setUTCHours(0, 0, 0, 0);
  //     filteredAllOrders = filteredAllOrders.filter((order) => {
  //       const orderDate = new Date(order.ship_date);
  //       orderDate.setUTCHours(0, 0, 0, 0);
  //       return orderDate >= lastMonthStart && orderDate <= lastMonthEnd;
  //     });
  //   }
  //   if (oldestChecked) {
  //     filteredAllOrders.sort((a, b) => (a.ship_date > b.ship_date ? 1 : -1));
  //   } else {
  //     filteredAllOrders.sort((a, b) => (a.ship_date < b.ship_date ? 1 : -1));
  //   }
  //   return filteredAllOrders;
  // };

  const handleSortChange = () => {
    console.log('hi');
  } 


  const handleSearchOrders = (query) => {
    if (query === "") {
      setSearchQuery("");
      setSearchQueryFormatted("");
      setCurrentView("all-orders");
      setRefreshOrders(true);
    } else {
      setCurrentPage(1);
      setCurrentView(`all-orders-search`);
      setSearchQueryFormatted(`&search=${query}`);
      setRefreshOrders(true);
      // axios
        // // .get(`http://127.0.0.1:8000/all-orders-search/?search=${query}`)
        // // .then((response) => {
          
        //   // let filteredAllOrders = response.data;
        //   // filteredAllOrders = applySorting(filteredAllOrders);
        //   // return filteredAllOrders;
        // })
        // .catch((error) => {
        //   console.error("Error searching orders:", error);
        // });
    }
  };

  const editShipDate = async (order, date) => {
    try {
      setFadingRows((prevFadingRows) => [...prevFadingRows, order.id]);
      const formattedDate = date ? date.toISOString().split("T")[0] : null;
      const updatedOrder = order;
      updatedOrder.ship_date = formattedDate;
      updatedOrder.delay_date = null;
      updatedOrder.delay_tbd = false;
      setTimeout(async () => {
        await axios.put(
          `http://127.0.0.1:8000/all-orders/${order.id}/`,
          updatedOrder
        );
        setTimeout(() => {
          setFadingRows((prevFadingRows) =>
            prevFadingRows.filter((id) => id !== order.id)
          );
          setRefreshOrders(true);
        }, 700);
      }, 700);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const editDelayDate = async (order, date) => {
    try {
      setFadingRows((prevFadingRows) => [...prevFadingRows, order.id]);
      const formattedDate = date ? date.toISOString().split("T")[0] : null;
      const updatedOrder = order;
      updatedOrder.delay_date = formattedDate;
      updatedOrder.delay_tbd = false;
      setTimeout(async () => {
        await axios.put(
          `http://127.0.0.1:8000/all-orders/${order.id}/`,
          updatedOrder
        );
        setTimeout(() => {
          setFadingRows((prevFadingRows) =>
            prevFadingRows.filter((id) => id !== order.id)
          );
          setRefreshOrders(true);
        }, 700);
      }, 700);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const editDelayTBD = async (order, tbdStatus) => {
    try {
      setFadingRows((prevFadingRows) => [...prevFadingRows, order.id]);
      const updatedOrder = order;
      updatedOrder.delay_tbd = tbdStatus;
      updatedOrder.ready = false;
      setTimeout(async () => {
        await axios.put(
          `http://127.0.0.1:8000/all-orders/${order.id}/`,
          updatedOrder
        );
        setTimeout(() => {
          setFadingRows((prevFadingRows) =>
            prevFadingRows.filter((id) => id !== order.id)
          );
          setRefreshOrders(true);
        }, 700);
      }, 700);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };
  const handleUnship = async (order) => {
    try {
      setFadingRows((prevFadingRows) => [...prevFadingRows, order.id]);
      let currentOrderID = order.id;
      const updatedOrder = { ...order };
      updatedOrder.shipped = !order.shipped;
      updatedOrder.ready = true;
      setTimeout(async () => {
        await axios.put(
          `http://127.0.0.1:8000/all-orders/${order.id}/`,
          updatedOrder
        );
        setAllOrders((prevAllOrders) =>
          prevAllOrders.map((o) => (o.id === currentOrderID ? updatedOrder : o))
        );
        setTimeout(() => {
          setFadingRows((prevFadingRows) =>
            prevFadingRows.filter((id) => id !== order.id)
          );
        }, 400);
      }, 400);
    } catch (error) {
      console.error(
        "Error updating the order. Server responded with:",
        error.response.status
      );
    }
  };

  const handleUnquote = async (order) => {
    try {
      setFadingRows((prevFadingRows) => [...prevFadingRows, order.id]);
      let currentOrderID = order.id;
      const updatedOrder = order;
      updatedOrder.quote = false;
      updatedOrder.ready = false;
      setTimeout(async () => {
        await axios.put(
          `http://127.0.0.1:8000/all-orders/${order.id}/`,
          updatedOrder
        );
        setAllOrders((prevAllOrders) =>
          prevAllOrders.map((o) => (o.id === currentOrderID ? updatedOrder : o))
        );
        setTimeout(() => {
          setFadingRows((prevFadingRows) =>
            prevFadingRows.filter((id) => id !== order.id)
          );
        }, 400);
      }, 400);
    } catch (error) {
      console.error(
        "Error updating the order. Server responded with:",
        error.response.status
      );
    }
  };

  const extractTextBeforeParentheses = (text) => {
    const splitText = text.split(" (");
    return splitText[0];
  };
  // const onPageChange = (pageNumber) => {
  //   if (pageNumber < 1 || pageNumber > totalPages) {
  //     return;
  //   }
  //   setCurrentPage(pageNumber);
  //   axios
  //     .get(`http://127.0.0.1:8000/all-orders/?page=${pageNumber}`)
  //     .then((response) => {
  //       const filteredAllOrders = response.data.results;
  //       setAllOrders(filteredAllOrders);
  //     })
  //     .catch((error) => {
  //       console.error("Error getting data", error);
  //     });
  // };

  return (
    <div className="all-main-div">
      <AllOrdersNav
        handleSortChange={handleSortChange}
        handleSearchOrders={handleSearchOrders}
        readyChecked={readyChecked}
        setReadyChecked={setReadyChecked}
        notReadyChecked={notReadyChecked}
        shippedChecked={shippedChecked}
        setShippedChecked={setShippedChecked}
        notShippedChecked={notShippedChecked}
        setNotShippedChecked={setNotShippedChecked}
        setNotReadyChecked={setNotReadyChecked}
        delayedChecked={delayedChecked}
        setDelayedChecked={setDelayedChecked}
        oldestChecked={oldestChecked}
        setOldestChecked={setOldestChecked}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="all-orders-table-container">
        <table className="all-orders-table">
          <thead>
            <tr>
              <th id="ship-date">Ship Date</th>
              <th id="order-number">Order Number</th>
              <th id="customer">Customer</th>
              <th id="items">Items</th>
              <th id="packages">Packages</th>
              <th id="notes">Notes</th>
              <th id="ready">Ready</th>
              <th id="shipped">Shipped</th>
              <th id="delete-col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.length === 0 ? (
              <tr>
                <td colSpan="9" className="no-orders-message">
                  No orders to display
                </td>
              </tr>
            ) : (
              allOrders.map((order) => (
                <tr
                  key={order.id}
                  className={`${
                    fadingRows.includes(order.id) || order.isRemoving
                      ? "fade-out"
                      : ""
                  }`}
                >
                  <td id="ship-date">
                    <EditShipDateButton
                      order={order}
                      currentDate={currentDate}
                      editShipDate={editShipDate}
                      editDelayDate={editDelayDate}
                      editDelayTBD={editDelayTBD}
                    />
                  </td>
                  <td id="order-number">
                    {order.order_number}
                    {order.quote ? (
                      <QuoteFlag handleUnquote={handleUnquote} order={order} />
                    ) : null}
                  </td>
                  <td id="customer-name">{order.customer_name}</td>
                  <td id="items">
                    <table className="item-table">
                      <tbody>
                        {Object.keys(order.item_subtype_dict).map(
                          (itemType, index) => (
                            <tr key={index}>
                              <td id="item">
                                {extractTextBeforeParentheses(itemType)}
                              </td>
                              <td id="qty">
                                {order.item_subtype_dict[itemType]}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </td>
                  <td id="packages">
                    <table className="package-table">
                      <tbody>
                        {Array.isArray(order.packages_array) &&
                          order.packages_array.map((packageItem, index) => (
                            <tr
                              key={index}
                              className={
                                fadingRows.includes(order.id)
                                  ? "row-fade-out"
                                  : ""
                              }
                            >
                              <td id="box-number">{index + 1}</td>
                              <td id="dimensions">{packageItem.dimensions}</td>
                              <td id="weight">
                                {packageItem.weight === "" && <span></span>}
                                {packageItem.dimensions !== "TBD" &&
                                  packageItem.weight === "TBD" && (
                                    <span>TBD</span>
                                  )}
                                {packageItem.dimensions === "TBD" &&
                                  packageItem.weight === "TBD" && <span></span>}
                                {packageItem.weight !== "TBD" &&
                                  packageItem.weight !== "" &&
                                  packageItem.weight + " lb"}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </td>
                  <td id="notes">
                    {order.notes_array && Array.isArray(order.notes_array) ? (
                      <table className="notes-table">
                        <tbody>
                          {order.notes_array.map((noteItem, index) => (
                            <tr key={index}>
                              <td>{noteItem.noteText}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      ""
                    )}
                  </td>
                  <td id="ready">
                    {order.ready === false || order.quote ? "No" : "Yes"}
                  </td>
                  <td id="shipped">
                    <div id="shipped-status-div">
                      {order.shipped === false ? "No" : "Yes"}
                      {order.quote ? null : (
                        <UnshipButton
                          order={order}
                          handleUnship={handleUnship}
                        />
                      )}
                    </div>
                  </td>
                  <td id="delete-col">
                    <DeleteButton
                      order={order}
                      setAllOrders={setAllOrders}
                      isRemoving={isRemoving}
                      setIsRemoving={setIsRemoving}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};
export default AllOrders;
