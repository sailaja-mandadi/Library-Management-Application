import http from "../http-common";

class LibraryDataService {
  findBySearch(search_val) {
    return http.get(`/books?search_val=${search_val}`);
  }

  createBorrower(data) {
    return http.post("/borrower", data);
  }

  createBookLoan(data) {
    return http.post("/book-loan", data);
  }

  findLoanBySearch(search_val) {
    return http.get(`/book-loan?search_val=${search_val}`);
  }

  checkIn(id) {
    return http.put(`/book-loan?id=${id}`);
  }

  refreshFines(){
    return http.post("/fines");
  }

  getAllFines() {
    return http.get("/fines/all");
  }


  getUnpaidFines() {
    return http.get("/fines/unpaid");
  }

  getFinesByCid(id) {
    return http.get(`/fines/card?id=${id}`);
  }

  payFinesByLid(id) {
    return http.put(`/fines/loan?id=${id}`);
  }


}

export default new LibraryDataService();

