import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../common/context";
import { getUserByHandle } from "../services/user.service";

const useBmrFormula = () => {
  const [bmrFormula, setBmrFormula] = useState(0);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const fetchUser = async () => {
        try {
          const userSnapshot = await getUserByHandle(user.displayName);

          if (userSnapshot.gender === "Male") {
            const basalMetaMaleFormula = (
              66 +
              13.7 * userSnapshot.weight +
              5 * userSnapshot.height -
              6.8 *
                (new Date().getFullYear() -
                  Number(userSnapshot.birthDate.slice(0, 4)))
            ).toFixed(1);
            setBmrFormula(basalMetaMaleFormula);
          } else {
            const basalMetaFemaleFormula = (
              655 +
              9.6 * userSnapshot.weight +
              1.8 * userSnapshot.height -
              4.7 *
                (new Date().getFullYear() -
                  Number(userSnapshot.birthDate.slice(0, 4)))
            ).toFixed(1);
            setBmrFormula(basalMetaFemaleFormula);
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchUser();
    }
  }, [user]);

  return bmrFormula;
};

export default useBmrFormula;
