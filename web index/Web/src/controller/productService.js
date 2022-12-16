function ProductService() {
  this.arr = [];
  this.getListProductApi = function () {
    var promise = axios({
      url: "https://637b69996f4024eac20ce110.mockapi.io/api/product?fbclid=IwAR2JWKVKwzsd7hnDAL7pYyz9lzMiB_jJ7IEWYkssuNaoCSaVbTOIYXZ9_1A",
      method: "GET",
    });

    return promise;
  };

  this.deleteProductApi = function (id) {
   return axios({
      url: `https://637b69996f4024eac20ce110.mockapi.io/api/product?fbclid=IwAR2JWKVKwzsd7hnDAL7pYyz9lzMiB_jJ7IEWYkssuNaoCSaVbTOIYXZ9_1A/${id}`,
      method: "DELETE",
    });
  };
}
