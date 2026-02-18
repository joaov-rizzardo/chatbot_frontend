export function QrCodeMock() {
    return (
        <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
        >
            {/* Top-left finder pattern */}
            <rect x="5" y="5" width="26" height="26" rx="3" fill="currentColor" />
            <rect x="8" y="8" width="20" height="20" rx="2" fill="white" />
            <rect x="11" y="11" width="14" height="14" rx="1.5" fill="currentColor" />

            {/* Top-right finder pattern */}
            <rect x="69" y="5" width="26" height="26" rx="3" fill="currentColor" />
            <rect x="72" y="8" width="20" height="20" rx="2" fill="white" />
            <rect x="75" y="11" width="14" height="14" rx="1.5" fill="currentColor" />

            {/* Bottom-left finder pattern */}
            <rect x="5" y="69" width="26" height="26" rx="3" fill="currentColor" />
            <rect x="8" y="72" width="20" height="20" rx="2" fill="white" />
            <rect x="11" y="75" width="14" height="14" rx="1.5" fill="currentColor" />

            {/* Timing pattern (horizontal) */}
            {[35, 39, 43, 47, 51, 55, 59].map((x, i) =>
                i % 2 === 0 ? <rect key={x} x={x} y="31" width="3" height="3" fill="currentColor" /> : null
            )}
            {/* Timing pattern (vertical) */}
            {[35, 39, 43, 47, 51, 55, 59].map((y, i) =>
                i % 2 === 0 ? <rect key={y} x="31" y={y} width="3" height="3" fill="currentColor" /> : null
            )}

            {/* Data modules — simulated pattern */}
            <rect x="35" y="5" width="3" height="3" fill="currentColor" />
            <rect x="39" y="5" width="3" height="3" fill="currentColor" />
            <rect x="47" y="5" width="3" height="3" fill="currentColor" />
            <rect x="55" y="5" width="3" height="3" fill="currentColor" />
            <rect x="63" y="5" width="3" height="3" fill="currentColor" />

            <rect x="35" y="9" width="3" height="3" fill="currentColor" />
            <rect x="43" y="9" width="3" height="3" fill="currentColor" />
            <rect x="51" y="9" width="3" height="3" fill="currentColor" />
            <rect x="59" y="9" width="3" height="3" fill="currentColor" />
            <rect x="63" y="9" width="3" height="3" fill="currentColor" />

            <rect x="39" y="13" width="3" height="3" fill="currentColor" />
            <rect x="47" y="13" width="3" height="3" fill="currentColor" />
            <rect x="55" y="13" width="3" height="3" fill="currentColor" />
            <rect x="63" y="13" width="3" height="3" fill="currentColor" />

            <rect x="35" y="17" width="3" height="3" fill="currentColor" />
            <rect x="43" y="17" width="3" height="3" fill="currentColor" />
            <rect x="59" y="17" width="3" height="3" fill="currentColor" />

            <rect x="39" y="21" width="3" height="3" fill="currentColor" />
            <rect x="47" y="21" width="3" height="3" fill="currentColor" />
            <rect x="55" y="21" width="3" height="3" fill="currentColor" />
            <rect x="63" y="21" width="3" height="3" fill="currentColor" />

            <rect x="35" y="25" width="3" height="3" fill="currentColor" />
            <rect x="43" y="25" width="3" height="3" fill="currentColor" />
            <rect x="51" y="25" width="3" height="3" fill="currentColor" />
            <rect x="59" y="25" width="3" height="3" fill="currentColor" />

            <rect x="5" y="35" width="3" height="3" fill="currentColor" />
            <rect x="9" y="35" width="3" height="3" fill="currentColor" />
            <rect x="17" y="35" width="3" height="3" fill="currentColor" />
            <rect x="25" y="35" width="3" height="3" fill="currentColor" />
            <rect x="39" y="35" width="3" height="3" fill="currentColor" />
            <rect x="47" y="35" width="3" height="3" fill="currentColor" />
            <rect x="55" y="35" width="3" height="3" fill="currentColor" />
            <rect x="63" y="35" width="3" height="3" fill="currentColor" />
            <rect x="71" y="35" width="3" height="3" fill="currentColor" />
            <rect x="79" y="35" width="3" height="3" fill="currentColor" />
            <rect x="87" y="35" width="3" height="3" fill="currentColor" />
            <rect x="91" y="35" width="3" height="3" fill="currentColor" />

            <rect x="5" y="39" width="3" height="3" fill="currentColor" />
            <rect x="13" y="39" width="3" height="3" fill="currentColor" />
            <rect x="21" y="39" width="3" height="3" fill="currentColor" />
            <rect x="35" y="39" width="3" height="3" fill="currentColor" />
            <rect x="43" y="39" width="3" height="3" fill="currentColor" />
            <rect x="51" y="39" width="3" height="3" fill="currentColor" />
            <rect x="67" y="39" width="3" height="3" fill="currentColor" />
            <rect x="75" y="39" width="3" height="3" fill="currentColor" />
            <rect x="83" y="39" width="3" height="3" fill="currentColor" />
            <rect x="91" y="39" width="3" height="3" fill="currentColor" />

            <rect x="9" y="43" width="3" height="3" fill="currentColor" />
            <rect x="17" y="43" width="3" height="3" fill="currentColor" />
            <rect x="25" y="43" width="3" height="3" fill="currentColor" />
            <rect x="39" y="43" width="3" height="3" fill="currentColor" />
            <rect x="47" y="43" width="3" height="3" fill="currentColor" />
            <rect x="59" y="43" width="3" height="3" fill="currentColor" />
            <rect x="67" y="43" width="3" height="3" fill="currentColor" />
            <rect x="79" y="43" width="3" height="3" fill="currentColor" />
            <rect x="87" y="43" width="3" height="3" fill="currentColor" />

            <rect x="5" y="47" width="3" height="3" fill="currentColor" />
            <rect x="13" y="47" width="3" height="3" fill="currentColor" />
            <rect x="21" y="47" width="3" height="3" fill="currentColor" />
            <rect x="35" y="47" width="3" height="3" fill="currentColor" />
            <rect x="43" y="47" width="3" height="3" fill="currentColor" />
            <rect x="55" y="47" width="3" height="3" fill="currentColor" />
            <rect x="63" y="47" width="3" height="3" fill="currentColor" />
            <rect x="71" y="47" width="3" height="3" fill="currentColor" />
            <rect x="83" y="47" width="3" height="3" fill="currentColor" />
            <rect x="91" y="47" width="3" height="3" fill="currentColor" />

            <rect x="9" y="51" width="3" height="3" fill="currentColor" />
            <rect x="17" y="51" width="3" height="3" fill="currentColor" />
            <rect x="25" y="51" width="3" height="3" fill="currentColor" />
            <rect x="39" y="51" width="3" height="3" fill="currentColor" />
            <rect x="47" y="51" width="3" height="3" fill="currentColor" />
            <rect x="59" y="51" width="3" height="3" fill="currentColor" />
            <rect x="67" y="51" width="3" height="3" fill="currentColor" />
            <rect x="75" y="51" width="3" height="3" fill="currentColor" />
            <rect x="87" y="51" width="3" height="3" fill="currentColor" />

            <rect x="5" y="55" width="3" height="3" fill="currentColor" />
            <rect x="13" y="55" width="3" height="3" fill="currentColor" />
            <rect x="21" y="55" width="3" height="3" fill="currentColor" />
            <rect x="35" y="55" width="3" height="3" fill="currentColor" />
            <rect x="43" y="55" width="3" height="3" fill="currentColor" />
            <rect x="51" y="55" width="3" height="3" fill="currentColor" />
            <rect x="63" y="55" width="3" height="3" fill="currentColor" />
            <rect x="71" y="55" width="3" height="3" fill="currentColor" />
            <rect x="83" y="55" width="3" height="3" fill="currentColor" />
            <rect x="91" y="55" width="3" height="3" fill="currentColor" />

            <rect x="9" y="59" width="3" height="3" fill="currentColor" />
            <rect x="17" y="59" width="3" height="3" fill="currentColor" />
            <rect x="25" y="59" width="3" height="3" fill="currentColor" />
            <rect x="39" y="59" width="3" height="3" fill="currentColor" />
            <rect x="51" y="59" width="3" height="3" fill="currentColor" />
            <rect x="59" y="59" width="3" height="3" fill="currentColor" />
            <rect x="67" y="59" width="3" height="3" fill="currentColor" />
            <rect x="79" y="59" width="3" height="3" fill="currentColor" />
            <rect x="87" y="59" width="3" height="3" fill="currentColor" />

            <rect x="35" y="69" width="3" height="3" fill="currentColor" />
            <rect x="43" y="69" width="3" height="3" fill="currentColor" />
            <rect x="51" y="69" width="3" height="3" fill="currentColor" />
            <rect x="59" y="69" width="3" height="3" fill="currentColor" />
            <rect x="67" y="69" width="3" height="3" fill="currentColor" />
            <rect x="75" y="69" width="3" height="3" fill="currentColor" />
            <rect x="83" y="69" width="3" height="3" fill="currentColor" />
            <rect x="91" y="69" width="3" height="3" fill="currentColor" />

            <rect x="39" y="73" width="3" height="3" fill="currentColor" />
            <rect x="47" y="73" width="3" height="3" fill="currentColor" />
            <rect x="55" y="73" width="3" height="3" fill="currentColor" />
            <rect x="67" y="73" width="3" height="3" fill="currentColor" />
            <rect x="79" y="73" width="3" height="3" fill="currentColor" />
            <rect x="87" y="73" width="3" height="3" fill="currentColor" />

            <rect x="35" y="77" width="3" height="3" fill="currentColor" />
            <rect x="43" y="77" width="3" height="3" fill="currentColor" />
            <rect x="51" y="77" width="3" height="3" fill="currentColor" />
            <rect x="63" y="77" width="3" height="3" fill="currentColor" />
            <rect x="71" y="77" width="3" height="3" fill="currentColor" />
            <rect x="83" y="77" width="3" height="3" fill="currentColor" />
            <rect x="91" y="77" width="3" height="3" fill="currentColor" />

            <rect x="39" y="81" width="3" height="3" fill="currentColor" />
            <rect x="47" y="81" width="3" height="3" fill="currentColor" />
            <rect x="59" y="81" width="3" height="3" fill="currentColor" />
            <rect x="67" y="81" width="3" height="3" fill="currentColor" />
            <rect x="75" y="81" width="3" height="3" fill="currentColor" />
            <rect x="87" y="81" width="3" height="3" fill="currentColor" />

            <rect x="35" y="85" width="3" height="3" fill="currentColor" />
            <rect x="43" y="85" width="3" height="3" fill="currentColor" />
            <rect x="51" y="85" width="3" height="3" fill="currentColor" />
            <rect x="63" y="85" width="3" height="3" fill="currentColor" />
            <rect x="71" y="85" width="3" height="3" fill="currentColor" />
            <rect x="83" y="85" width="3" height="3" fill="currentColor" />

            <rect x="39" y="89" width="3" height="3" fill="currentColor" />
            <rect x="47" y="89" width="3" height="3" fill="currentColor" />
            <rect x="55" y="89" width="3" height="3" fill="currentColor" />
            <rect x="67" y="89" width="3" height="3" fill="currentColor" />
            <rect x="79" y="89" width="3" height="3" fill="currentColor" />
            <rect x="91" y="89" width="3" height="3" fill="currentColor" />

            <rect x="35" y="93" width="3" height="3" fill="currentColor" />
            <rect x="43" y="93" width="3" height="3" fill="currentColor" />
            <rect x="59" y="93" width="3" height="3" fill="currentColor" />
            <rect x="71" y="93" width="3" height="3" fill="currentColor" />
            <rect x="83" y="93" width="3" height="3" fill="currentColor" />
            <rect x="91" y="93" width="3" height="3" fill="currentColor" />
        </svg>
    )
}
