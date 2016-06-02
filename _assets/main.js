

    $(document).ready(function () {



// RIO CALC
        currentPage = 1;
        $(".rio-page[data-page='" + currentPage + "']").show();
        window.rioNextPage = function (button) {
// validate a form
            var emptySelect = $(button).parent().find("select").filter(function () {
                return this.value === "";
            });
            var emptyInput = $(button).parent().find("input").filter(function () {
                return this.value < 0 || this.value > 999 || this.value === "";
            });

            if (emptyInput.length || emptySelect.length) {
                alert("Please check the fields again");
                return;
            }
// next page
            $('.rio-page').hide();
            currentPage++;
            if (currentPage >= 2 && currentPage <= 4) {
                $(".rio-page[data-page='bar']").show();
                $('.rioProgessbar ul li').eq(currentPage - 2).addClass("rioactive-p");
            } else {
                $(".rio-page[data-page='bar']").hide();
            }

            $(".rio-page[data-page='" + currentPage + "']").show();
        };
        window.rioPrevPage = function () {
            $('.rio-page').hide();
            currentPage--;
            if (currentPage >= 2 && currentPage <= 4) {
                $(".rio-page[data-page='bar']").show();
                $('.rioProgessbar ul li').eq(currentPage - 1).removeClass("rioactive-p");
            } else {
                $(".rio-page[data-page='bar']").hide();
            }
            $(".rio-page[data-page='" + currentPage + "']").show();
        };
        // costs plan
        NonContractCost1 = 40; // 3<
        NonContractCost2 = 30; // 20<
        NonContractCost3 = 27; // 50<
        NonContractCost4 = 26.98; // 100<
        NonContractCost5 = 24.99; // more than 100
        TwoYearCost1 = 38; // 3<
        TwoYearCost2 = 28; // 20<
        TwoYearCost3 = 22; // 50<
        TwoYearCost4 = 21.98; // 100<
        TwoYearCost5 = 19.99; // more than 100
// create statement
        window.statement = function () {
            lCost = MonthlyCost * 24;
            lPremis = MonthlyPremis * 24;
            if ((lPremis - lCost) > 0) {
                savingAbsolute = lPremis - lCost;
                savingPersantage = ((100 * savingAbsolute) / lPremis);
                savingPersantage = Math.floor(savingPersantage) + 1;
            } else {
                savingAbsolute = 0;
                savingPersantage = 0;
            }

            $('#l-cost-us').text("$ " + lCost);
            $('#l-cost-you').text("$ " + lPremis);
            $('.CostSaving-absolute').text("$ " + savingAbsolute);
            $('.CostSaving-persantage').text("You Save " + savingPersantage + " %");

            // show the inputs
            $('#LongdistanceC-show').text("$ " + longdistanceCost);
            $('#tollC-show').text("$ " + tollCost);
            $('#phoneNumberC-show').text("$ " + phoneNumberCost);
            $('#faxC-show').text("$ " + faxCost);
            $('#ttlC-show').text("$ " + ttlCost);
            $('#msC-show').text("$ " + msCost);
            $('#additionC-show').text("$ " + additionCost);
            $('#leaseC-show').text("$ " + leaseCost);
            $('#staffC-show').text("$ " + staffCost);
        };
// calculate and print customer cost
        window.CostumerCost = function () {
            longdistanceCost = +$('#LongdistanceC').val();
            tollCost = +$('#tollC').val();
            faxCost = +$('#faxC').val();
            phoneNumberCost = +$('#phoneNumberC').val();
            ttlCost = +$('#ttlC').val();
            msCost = +$('#msC').val();
            additionCost = +$('#additionC').val();
            leaseCost = +$('#leaseC').val();
            staffCost = +$('#staffC').val();

            MonthlyPremis = longdistanceCost + faxCost + tollCost + phoneNumberCost + ttlCost + msCost + additionCost + leaseCost + staffCost;
            $('.monthly-onPremis').text("$ " + MonthlyPremis);

        };
        // calculate the Total monthly cost
        window.TotalMonthlyCost = function () {

            employeeCount = +$('#employee-count').val();
            employeeRemoteCount = +$('#employees-r').val();
            contractType = $('input[name=purch-p]:checked').val();
            TotalEmployeeCount = (employeeRemoteCount + employeeCount);
            if (isNaN(TotalEmployeeCount)) {
                return;
            } // determine the type of input
            if (contractType === 'no-contract') {
                if (TotalEmployeeCount < 3) {
                    PricePoint = NonContractCost1;
                } else if (TotalEmployeeCount < 20) {
                    PricePoint = NonContractCost2;
                } else if (TotalEmployeeCount < 50) {
                    PricePoint = NonContractCost3;
                } else if (TotalEmployeeCount < 100) {
                    PricePoint = NonContractCost4;
                } else if (TotalEmployeeCount < 1000) {
                    PricePoint = NonContractCost5;
                } else {
                    alert("Your profile indicates you qualify for a customized quote. Please contact our sales team directly at (949)-381-2525");
                    return;
                }

            } else {
                if (TotalEmployeeCount < 3) {
                    PricePoint = TwoYearCost1;
                } else if (TotalEmployeeCount < 20) {
                    PricePoint = TwoYearCost2;
                } else if (TotalEmployeeCount < 50) {
                    PricePoint = TwoYearCost3;
                } else if (TotalEmployeeCount < 100) {
                    PricePoint = TwoYearCost4;
                } else if (TotalEmployeeCount < 1000) {
                    PricePoint = TwoYearCost5;
                } else {
                    alert("Your profile indicates you qualify for a customized quote. Please contact our sales team directly at (949)-381-2525");
                    return;
                }
            }
            MonthlyCost = TotalEmployeeCount * PricePoint;
            $('.total-monthly-cost').text("$" + MonthlyCost);

        };
    });