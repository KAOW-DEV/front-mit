    perm(array, length) {
      return array.flatMap((v, i) =>
        length > 1
          ? this.perm(array.slice(i + 1), length - 1).map((w) => [v, ...w])
          : [[v]]
      );
    },

     let arr = [f1, f2, f3, f4, f5];

      for (let index = 0; index < arr.length; index++) {
        this.perm(arr, index + 1).forEach((a) => {
          console.log(...a);
          console.log("a", a);
          if (a[index] != null) {
            s1 = "received_date=" + a[index];
          } else {
            a[index] = "";
          }
        });
      }

      console.log("s1", s1);

      return;
      if (this.itemProduct) {
        // console.log("itemProduct", this.itemProduct);
        this.itemsReceived = await this.findItemProduct();

        if (f1) {
          console.log("f1", f1);
        } else if (f2) {
          console.log("f2", f2);
        } else if (f3) {
          console.log("f3", f3);
        } else if (f4) {
          console.log("f4", f4);
        } else if (f5) {
          console.log("f5", f5);
        } else if (f1 && f2) {
        } else if (f1 && f3) {
        } else if (f1 && f4) {
        } else if (f1 && f5) {
        } else if (f1 && f5) {
        }
      } else {
        console.log("NotProduct");
      }